import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('endpoint')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth()
  }

 @UseGuards(AuthGuard('jwt'))
 @Post('/erase')
  async eraseAccount(@Request() req: any, @Body('password') password: string) {
    const isPasswordValid = await this.appService.validatePassword(req.user.id, password)
    if (!isPasswordValid) {
      return { message: 'incorrect password' }
    }
    await this.appService.eraseUserData(req.user.id)
    return { message: 'account deleted' }
  }
}
