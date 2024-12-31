import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo-second',
  templateUrl: './demo-second.component.html',
  standalone: false,
  styleUrl: './demo-second.component.scss'
})
export class DemoSecondComponent implements OnInit {
  // 响应式表单
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      skills: this.fb.array([])
    });
  }

  ngOnInit() {
    // 初始化添加一个技能输入框
    this.addSkill();
  }

  //Getter(访问器) 是一种特殊的方法，它允许你像访问属性一样获取一个值，但实际上是在执行一个方法。
  //在 TypeScript/JavaScript 中，使用 get 关键字来定义。
  // 这是一个 getter 方法；
  // 获取skills FormArray,当你使用 skills 时，它会自动调用 getter 方法(目的是简化访问：不用每次都写 this.reactiveForm.get('skills'))
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
