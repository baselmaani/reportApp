import { BodyParams } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Get, Groups, Post, Returns, Summary } from '@tsed/schema';
import { TokenResultType, UserInput } from 'src/models/UserModel';
import { AuthService } from 'src/services/AuthService';

@Controller('/auth')
export class AuthController {
  @Get('/')
  get() {
    return 'hello';
  }

  @Post('/login')
  @Summary('login user')
  @Returns(201, TokenResultType)
  async loginUser(@BodyParams() @Groups('creation') user: UserInput) {
    return AuthService.login(user.email, user.password, 'user');
  }

  @Post('/staff/login')
  @Summary('login staff')
  @Returns(201, TokenResultType)
  async loginStaff(@BodyParams() @Groups('creation') user: UserInput) {
    return AuthService.staffLogin(user.email, user.password);
  }
}
