import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { 
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd'
import { RouteComponentProps } from 'react-router'
import { UserService } from 'src/services/user'
import { UserStore } from 'src/stores/modules/user'

export interface LoginProps extends RouteComponentProps<{}> {
  form: any,
  userService: UserService,
  userStore: UserStore
}

@inject('userService', 'userStore')
@observer
class Login extends React.Component<LoginProps, {}> {

  public userService: UserService
  public userStore: UserStore

  constructor (props: any) {
    super(props)
    this.userService = props.userService
    this.userStore = props.userStore
  }

  public login = async (e: any): Promise<any> => {
    e.preventDefault()
    this.props.history.replace('/main/home')

    // this.props.form.validateFields(async (err: any, values: any) => {
    //   if (!err) {
    //     const putData: any = {
    //       ...values,
    //       remember: undefined
    //     }
    //     const res = await this.userService.sign(putData)
    //     if (res.status === 0) {
    //       message.success('登录成功')
    //       this.userStore.saveLoginData(res.data)
    //       this.menuStore.reCache()
    //       this.props.history.replace('/main/home')
    //     } else {
    //       message.error(res.msg || '登录失败')
    //     }
    //   }
    // })
  }

  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-main">
        <div className="login-form">
          <div className="login-logo">
            <i></i>
            <span>南昌市公安局数字天网</span>
          </div>
          <Form className="form-con" onSubmit={this.login}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [{
                    message: '用户名不能为空',
                    required: true
                  }]
                })(
                  <Input 
                    prefix={<Icon type="user" className="placeholder-color" />}
                    placeholder="请输入用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{
                    message: '密码不能为空',
                    required: true
                  }]
                })(
                  <Input
                    prefix={<Icon type="lock" className="placeholder-color" />}
                    type="password"
                    placeholder="请输入密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <div className="forgot-box">
                {
                  getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(
                  <Checkbox>记住密码</Checkbox>)
                }
              </div>
              <div className="sub-box">
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
                <Button type="primary" className="login-form-button">
                  PKI登录
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)
