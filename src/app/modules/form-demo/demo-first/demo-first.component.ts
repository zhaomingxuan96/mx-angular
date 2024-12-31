import { Component } from '@angular/core';

interface User {
  name: string;
  email: string;
  phone: string;
  [key: string]: string;
}
interface Field {
  name: string;
  label: string;
  type: string;
  required: boolean;
  minLength?: number;
  pattern?: string;
}
@Component({
  selector: 'app-demo-first',
  standalone: false,
  templateUrl: './demo-first.component.html',
  styleUrl: './demo-first.component.scss'
})
export class DemoFirstComponent {
  // 模板驱动表单数据
  templateUser: User = {
    username: '',
    name: '',
    email: '',
    phone: ''
  };

  // 动态表单字段
  dynamicFields: Field[] = [
    {
      name: 'username',
      label: '用户名',
      type: 'text',
      required: true,
      minLength: 3
    },
    { label: '姓名', type: 'text', name: 'name', required: true, minLength: 4 },
    { label: '邮箱', type: 'email', name: 'email', required: true, pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
    { label: '电话', type: 'tel', name: 'phone', required: true, pattern: '^1[3-9][0-9]{9}$' }
  ];

  // 模板驱动表单提交
  onTemplateSubmit() {
    if (this.templateUser.name && this.templateUser.email && this.templateUser.phone) {
      console.log('模板驱动表单提交:', this.templateUser);
    }
  }
}
