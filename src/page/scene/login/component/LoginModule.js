import {Component} from 'react';
import {
    Link, Redirect,
} from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Input, Cascader, Divider, Button, Alert, Row, Col} from 'antd';
import {
    UserOutlined, LockOutlined, EnvironmentOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';
import styles from './LoginModule.module.less';
import data from '../../common/location.json';

class LoginModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: false,
            location: [],
            message: '请输入登录信息',
            messageType: 'warning',
            username: '',
            password: '',
            certificateCode: '',
            certificateImage: '',
        };
    }
    componentDidMount() {
        this.options = data.map(
            province => {
                let newProvince = province.children.map(
                    city => {
                        let newCity = city.children.map(
                            (area, areaIndex) => {
                                return {value: area.code, label: area.name};
                            }
                        );

                        return {value: city.code + '00', label: city.name, children: newCity};
                    }
                );

                return {value: province.code + '0000', label: province.name, children: newProvince};
            }
        );
        this.setState({options: this.options});
        this.getCertificateCodeImage();
        document.addEventListener('keydown', this.keyEvent);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyEvent);
    }
    keyEvent = e => {
        if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
            this.login();
        }
    }
    getCertificateCodeImage = () => {
        axios.get(
            '/sourceview/code/createCode',
            {
                withCredentials: true,
            }
        ).then(
            response => {
                if (response.data && response.data.respCode === '0000') {
                    console.log(response.headers);
                    console.log(response.data.respData);
                    this.setState({certificateImage: response.data.respData});
                }
            }
        ).catch(
            event => {
                console.log(event);
            }
        );
    }
    login = () => {
        let username = '';
        let password = '';
        let location = '';
        let certificateCode = '';
        if (this.state && this.state.username) {
            username = this.state.username;
        }
        else {
            this.setState({
                messageType: 'error',
                message: '请输入用户名',
            });
            return;
        }
        if (this.state && this.state.password) {
            password = this.state.password;
        }
        else {
            this.setState({
                messageType: 'error',
                message: '请输入密码',
            });
            return;
        }
        if (this.state && this.state.certificateCode) {
            certificateCode = this.state.certificateCode;
        }
        else {
            this.setState({
                messageType: 'error',
                message: '请输入验证码',
            });
            return;
        }
        console.log(username, password, certificateCode, location);
        // 登录请求
        axios.post(
            '/sourceview/auth/login',
            {
                username: username,
                password: password,
                code: certificateCode,
            },
            {
                withCredentials: true,
            }
        ).then(
            response => {
                console.log('login', response.data);
                if (response.data && response.data.respCode) {
                    if (response.data.respCode !== '0000') {
                        this.setState({
                            messageType: 'error',
                            message: response.data.respMsg,
                        });
                        return;
                    }
                    this.props.history.push('/scene/sp');
                }
            }
        ).catch(
            event => {
                console.log(event);
            }
        );
    }
    cascaderValue = value => {
        let locationStr = '';
        value.forEach(
            item => {
                locationStr += item + ' ';
            }
        );
        this.setState({location: value});
    }
    getUserName = event => {
        if (event && event.target && event.target.value) {
            this.setState({username: event.target.value});
        }
    }
    getPassword = event => {
        if (event && event.target && event.target.value) {
            this.setState({password: event.target.value});
        }
    }
    getCertificateCode = event => {
        if (event && event.target && event.target.value) {
            this.setState({certificateCode: event.target.value});
        }
    }
    render() {
        return (
            <div className={styles.container}>
                <Row justify='center' align='middle' className={styles.loginContainer} >
                    <Col span={20} flex='auto' className={styles.loginContainer} >
                        <Row justify='center' align='middle' className={styles.verticalStyle}>
                            <Col span={10} className={styles.rowStyle}>
                                <div className={styles.loginWindowTitle}>
                                    账号登录
                                </div>
                            </Col>
                            <Col span={24} className={styles.rowStyle}>
                                <div>
                                    <Alert
                                        message={this.state.message}
                                        type={this.state.messageType}
                                        showIcon
                                        closable
                                        className={styles.alertWindow}
                                    />
                                </div>
                            </Col>
                            <Col span={24} className={styles.rowStyle}>
                                <Input
                                    size="large"
                                    placeholder="请输入OA账号/手机号"
                                    prefix={<UserOutlined />}
                                    className={styles.textInput}
                                    onChange={this.getUserName}
                                />
                            </Col>
                            <Col span={24} className={styles.rowStyle}>
                                <Input.Password
                                    size="large"
                                    placeholder="请输入8位数密码"
                                    prefix={<LockOutlined />}
                                    onChange={this.getPassword}
                                />
                            </Col>
                            <Col span={24} className={styles.rowStyle}>
                                <Row align='middle'>
                                    <Col span={18}>
                                        <Input
                                            size="large"
                                            placeholder="验证码"
                                            prefix={<SafetyCertificateOutlined />}
                                            onChange={this.getCertificateCode}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <img
                                            src={this.state.certificateImage}
                                            onClick={this.getCertificateCodeImage}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} className={styles.rowStyle}>
                                <Button
                                    type="primary"
                                    // shape="round"
                                    size='large'
                                    className={styles.loginBotton}
                                    onClick={this.login}
                                >
                                    登录
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(LoginModule);
