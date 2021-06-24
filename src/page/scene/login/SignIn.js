import {Component} from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import {Carousel} from 'antd';
import styles from './SignIn.module.less';
import LoginModule from './component/LoginModule';
import SignUpModule from './component/SignUpModule';


export default class SignIn extends Component {

    render() {
        if (this.state != null && this.state.loginState) {
            return (
                <Redirect to='/scene/sp' />
            );
        }
        return (
            <div style={{'height': '100%', 'width': '100%'}}>
                <div className={styles.head}>
                    <span>
                        <img
                            className={styles.icon}
                            src={process.env.PUBLIC_URL + '/image/loginPic/chinaunicom.svg'}
                        />
                    </span>
                    <span className={styles.titleText}>中国联通集团三大资源可视化系统</span>
                </div>
                <div className={styles.loginBody}>
                    <div className={styles.loginText}>
                        {/* <div className={styles.loginTextH}>CHINAUNICOM</div> */}
                        {/* <div>
                            <p className={styles.loginTextP}>
                                If there are something wrong, please contact with me using email!<br></br>
                                Thank you for your patience!<br></br>
                                @all right own to chinaunicom&nbsp;🥳🥳🥳
                            </p>
                        </div>
                        <hr className={styles.divideLine}></hr> */}
                        {/* <Carousel className={styles.carousel}>
                            <div>
                                <img
                                    className={styles.img}
                                    src={process.env.PUBLIC_URL + '/image/loginPic/5GNetworkCoWork.png'}
                                />
                            </div>
                            <div>
                                <img
                                    className={styles.img}
                                    src={process.env.PUBLIC_URL + '/image/loginPic/GD5GNetworkCoWorkScreen.png'}
                                />
                            </div>
                            <div>
                                <img
                                    className={styles.img}
                                    src={process.env.PUBLIC_URL + '/image/loginPic/CountryPicWar.png'}
                                />
                            </div>
                            <div>
                                <img
                                    className={styles.img}
                                    src={process.env.PUBLIC_URL + '/image/loginPic/Nation5GSiteView.png'}
                                />
                            </div>
                            <div>
                                <img
                                    className={styles.img}
                                    src={process.env.PUBLIC_URL + '/image/loginPic/3KMFusion.png'}
                                />
                            </div>
                            <div>
                                <img
                                    className={styles.img}
                                    src={process.env.PUBLIC_URL + '/image/loginPic/PoliticalCoorCombuilding.png'}
                                />
                            </div>
                        </Carousel> */}
                        <img
                            style={{width: 300}}
                            src={process.env.PUBLIC_URL + '/image/loginPic/analysisdata.svg'}
                        />
                    </div>
                    <div className={styles.loginWindow}>
                        <div style={{width: '100%', height: '100%'}}>
                            <Switch>
                                <Route path="/login">
                                    <LoginModule />
                                </Route>
                                {/* 注册模块废弃，等待新版模型图修改 */}
                                <Route path="/signup">
                                    <SignUpModule />
                                </Route>
                                <Route path="/">
                                    <LoginModule />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
