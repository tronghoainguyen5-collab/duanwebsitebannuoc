import { User } from "../models/User.js";
import { UserService } from "../services/UserService.js";

export class LoginController{
    private userService = UserService.getInstance();

    init(){
        this.attachEvents();
    }
    private attachEvents():void{
        document.querySelector('#login-form')?.addEventListener('submit', async (e:Event)=>{
            e.preventDefault();
            let email:string = (document.querySelector('#email') as HTMLInputElement).value;
            let password:string = (document.querySelector('#password') as HTMLInputElement).value;
            let user:User | false = await this.userService.login(email, password);
            if(user){
                alert('Đăng nhập thành công');
                this.userService.saveLoginState(user);
                if(user.role == "admin"){
                    location.href = "admin.html"
                }else{
                location.href = 'index.html';
                }
            }else{
                alert('Email hoặc mật khẩu không đúng')
            }
        })
    }
}