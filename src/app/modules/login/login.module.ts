import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
    declarations: [LoginComponent],//声明的组件
    imports: [LoginRoutingModule],//导入的模块
    providers: [],//提供给应用的服务
    exports: []//导出的组件
})
export class LoginModule { }