import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { FormValidationService } from '../../../services/form-validation.service';

@Component({
  selector: 'app-demo-third',
  templateUrl: './demo-third.component.html',
  standalone: false,
  styleUrl: './demo-third.component.scss'
})
export class DemoThirdComponent implements OnInit {
  // 响应式表单
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder, private formValidationService: FormValidationService) {
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      skills: this.fb.array([])
    });
  }

   // 使用验证服务获取错误消息
   getErrorMessage(control: string | AbstractControl): string {
    if (typeof control === 'string') {
      return this.formValidationService.getErrorMessage(this.reactiveForm.get(control));
    }
    return this.formValidationService.getErrorMessage(control);
  }

   // 使用验证服务检查错误
   hasError(control: string | AbstractControl): boolean {
    if (typeof control === 'string') {
      return this.formValidationService.hasError(this.reactiveForm.get(control));
    }
    return this.formValidationService.hasError(control);
  }

  ngOnInit() {
    // 初始化添加一个技能输入框
    this.addSkill();
  }

  // 获取skills FormArray
  get skills() {
    return this.reactiveForm.get('skills') as FormArray;
  }

  // 添加技能输入框
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  // 删除技能入框
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // 响应式表单提交
  onReactiveSubmit() {
    if (this.reactiveForm.valid) {
      console.log('响应式表单提交:', this.reactiveForm.value);
    }
  }
}
