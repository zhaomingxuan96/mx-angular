import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { LoginComponent } from '../modules/login/login.component';

interface PatternErrors {
    [key: string]: string;
}

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {
    // 存储错误消息映射
    private errorMessages = {
        required: '此字段必填',
        email: '请输入有效的邮箱地址',
        minlength: (params: any) => `最少需要 ${params.requiredLength} 个字符`,
        pattern: {
            '^1\\d{10}$': '请输入有效的手机号码'
        } as PatternErrors
    };

    /**
     * 检查表单控件是否有错误
     * @param control 要检查的表单控件，可以是任何继承自 AbstractControl 的控件
     * @returns 布尔值，表示控件是否有错误
     */
    hasError(control: AbstractControl | null): boolean {

        if (!control) return false;
        // instanceof 运算符用于检查对象是否是某个类的实例
        // 如果控件是 FormArray 类型（即表单控件数组）
        // if (control instanceof FormArray) {
        //     console.log('FormArray', control);

        //     // 使用 some 方法检查数组中是否有任何控件满足条件
        //     // some() 方法在找到第一个满足条件的元素时就会返回 true
        //     return control.controls.some(control =>
        //         // invalid 表示控件验证未通过
        //         // dirty 表示用户修改过值
        //         // touched 表示用户触碰过（如获得过焦点）
        //         control.invalid && (control.dirty || control.touched)
        //     );
        // }

        // 对于单个控件，检查是否无效且被用户交互过
        // 如果invalid为true(即验证未通过)，且dirty或touched为true(即用户修改过值或触碰过) ，则返回true,前端页面显示验证未通过信息
        // 如果invalid为false(即验证通过)，则返回false,前端页面不显示验证未通过信息
        return control.invalid && (control.dirty || control.touched);
    }

    /**
     * 获取表单控件的错误信息
     * @param control 要获取错误信息的表单控件
     * @returns 对应的错误消息字符串
     */
    getErrorMessage(control: AbstractControl | null): string {
        if (!control || !control.errors) return '';

        // if (control instanceof FormArray) {
        //     const invalidControl = control.controls.find(control =>
        //         control.invalid && (control.dirty || control.touched)
        //     );
        //     return invalidControl ? this.getErrorMessage(invalidControl) : '';
        // }

        // Object.keys() 是 JavaScript 内置方法，用于获取对象的所有属性名
        // 例如：对于对象 {name: 'Tom', age: 18}
        // Object.keys() 会返回 ['name', 'age']
        // 
        // control.errors 的结构可能如：
        // { required: true, minlength: {requiredLength: 6, actualLength: 3} }
        // 那么 Object.keys(control.errors) 会返回 ['required', 'minlength']
        // [0] 取第一个错误类型

        const firstError = Object.keys(control.errors)[0];

        // as keyof typeof 是 TypeScript 的类型断言
        // typeof this.errorMessages 获取 errorMessages 对象的类型
        // keyof 获取该类型的所有属性名的联合类型
        // 例如：如果 errorMessages 的类型是 {required: string, email: string}
        // 则 keyof typeof errorMessages 就是 'required' | 'email'
        //
        // 这样做是为了确保 firstError 是 errorMessages 中存在的键
        // 这提供了类型安全，防止访问不存在的属性
        const getError = this.errorMessages[firstError as keyof typeof this.errorMessages];

        // typeof 运算符在运行时用于检查值的类型
        // 可能的结果有：'string', 'number', 'boolean', 'function', 'object' 等
        // 例如：对于 minlength 错误，getError 是一个函数
        // typeof getError 将返回 'function'
        if (typeof getError === 'function') {
            // 如果是函数，调用它并传入错误详情
            // control.errors[firstError] 可能是 {requiredLength: 6, actualLength: 3} 
            return getError(control.errors[firstError]);
        }

        // 对于 pattern 验证，getError 是一个对象
        if (typeof getError === 'object') {
            // Object.keys(getError) 获取所有正则表达式模式
            // find() 方法查找第一个匹配的模式
            const pattern = Object.keys(getError).find(key =>
                // new RegExp(key) 将字符串转换为正则表达式对象
                // ?. 是可选链操作符，如果左边的值为 null 或 undefined，
                // 则不会继续访问后面的属性，而是返回 undefined
                // 例如：如果 control.errors 为 null，
                // control.errors?.['pattern'] 会返回 undefined 而不是报错
                new RegExp(key).test(control.errors?.['pattern']?.requiredPattern || '')
            );
            return pattern ? getError[pattern] : '输入无效';
        }

        // || 是逻辑或操作符，如果左边的值为假值（如 undefined），则返回右边的值
        // 这里用作默认值处理
        return getError || '输入无效';
    }
}