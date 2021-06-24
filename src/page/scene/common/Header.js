import React, {Component, useState} from 'react';
import {Picker} from 'antd-mobile';
import {connect} from 'react-redux';
import {Layout, Dropdown, Menu, Button, Divider, Drawer, Space, Cascader, message} from 'antd';
import {
    LeftCircleOutlined,
    CaretDownOutlined,
    EnvironmentOutlined,
    AppstoreOutlined,
    UserOutlined,
    SearchOutlined,
    LogoutOutlined,
    LockOutlined,
    SwapOutlined,
    PushpinOutlined,
    CloseCircleOutlined,
    MenuOutlined,
    EditFilled,
    DesktopOutlined,
    WindowsOutlined,
} from '@ant-design/icons';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import {changeLocation, updateCurrentAdminName} from '../../../app/reducer/common/location';
import {
    changeSelectedOptions,
    openDrawingManager,
    closeDrawingManager,
    openMenuMobile,
    closeMenuMobile,
    openSearchMobile,
    closeSearchMobile,
} from '../../../app/reducer/global';
import {pageConfigs, pageConfigsMap} from './pageConfigs';
import styles from './Header.module.less';
import data from './location.json';
// import ThreeSearch from '@/components/Search/ThreeSearch';
// import BuildSearch from '@/components/Search/BuildSearch';
import commonApi from '../common/api/index';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: '5G端网业协同',
            location: [],
            loginState: true,
            name: '',
            deptName: '',
            isAuthedAll: false,
            authedLocation: [],
            locationOptions: [],
        };
        this.menu = (
            <Menu>
                {pageConfigs.map(item => {
                    return (
                        <Menu.Item key={item.key} onClick={this.handleSceneMenuClick}>
                            <Link to={item.key} className={styles.menuLink}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
        this.toolkitOption = (
            <Menu>
                <Menu.Item onClick={this.handleOpenDrawingManager}>
                    <EditFilled />
                    <span className={styles.menuLink}>圈选地图</span>
                </Menu.Item>
                <Menu.Item onClick={this.handleGridsManager}>
                    <EditFilled />
                    <span className={styles.menuLink}>网格管理</span>
                </Menu.Item>
            </Menu>
        );
        this.userOption = (
            <Menu>
                <Menu.Item>
                    <DesktopOutlined />
                    <span className={styles.menuLink}>
                        <a
                            href="http://10.244.6.92:8030/pro/screen/online/unicom5g"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            大屏
                        </a>
                    </span>
                </Menu.Item>
                <Menu.Item>
                    <WindowsOutlined />
                    <span className={styles.menuLink}>
                        <a
                            href="http://10.244.6.92:8030/pro/screen/online/unicomindex"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            深色系统
                        </a>
                    </span>
                </Menu.Item>
                <Menu.Item>
                    <UserOutlined />
                    <span className={styles.menuLink}>我的工作台</span>
                </Menu.Item>
                <Menu.Item>
                    <LogoutOutlined />
                    <span className={styles.menuLink} onClick={this.logout}>
                        退出登录
                    </span>
                </Menu.Item>
            </Menu>
        );

        const options = this.options = data.map(province => {
            let newProvince = province.children.map(city => {
                let newCity = city.children.map((area, areaIndex) => {
                    return {value: area.code, label: area.name};
                });

                return {value: city.code + '00', label: city.name, children: newCity};
            });

            return {value: province.code + '0000', label: province.name, children: newProvince};
        });

        const boundaryAlias = {
            110000: true,
            120000: true,
            310000: true,
            500000: true,
        };
        // 直辖市去掉一级
        for (let i = 0; i < options.length; i++) {
            if (boundaryAlias[options[i].value]) {
                let label = options[i].label;
                const newChildren = [];
                for (const child of options[i].children) {
                    if (child.children) {
                        for (const c of child.children) {
                            newChildren.push(c);
                        }
                    }
                }
                options[i].children = newChildren;
                options[i].label = label;
            }
        }
        this.regionDataMobile = this.options.map(province => {
            let newCitys = province.children.map(city => {
                if (!city.children) {
                    return city;
                }
                let newAreas = city.children.map(area => {
                    return area;
                });
                newAreas.unshift({
                    value: '-',
                    label: '全部',
                });
                return {
                    ...city,
                    children: newAreas,
                };
            });
            newCitys.unshift({
                value: '-',
                label: '全部',
            });
            return {
                ...province,
                children: newCitys,
            };
        });
    }
    componentDidMount() {
        const {location, changeSelectedOptions} = this.props;
        this.setState({loginState: this.props.loginState});

        this.setState({options: this.options});
        // this.changeSelectedOptionsFunc(location);

        // todo 这里执行登录检查
        axios.get(
                '/sourceview/auth/checkLogin',
                {},
                {
                    withCredentials: true,
                }
            ).then(response => {
                // 输出状态检查返回结果
                if (response.data && response.data.respCode !== '0000') {
                    message.error('当前登录状态已失效，请重新登录！');
                    this.setState({
                        loginState: false,
                    });
                }else {
                    let location = response.data.respData.adcode;
                    let defaultLocation = location;
                    let isAuthedAll = false;
                    let locationOptions = null;
                    if (location.length === 1 && location[0] === '000000') {
                        locationOptions = this.state.options;
                        defaultLocation = ['430000'];
                        // defaultLocation = ['430000', '430100', '430102'];
                        isAuthedAll = true;
                    }
                    else {
                        locationOptions = this.getLocationOptions(location);
                    }
                    // console.log('login ==> ', response.data)
                    this.setState({
                        loginState: true,
                        name: response.data.respData.username,
                        location: defaultLocation,
                        deptName: response.data.respData.deptName,
                        authedLocation: location,
                        locationOptions,
                        isAuthedAll,
                    });
                    this.props.changeLocation({location: defaultLocation});
                    this.changeSelectedOptionsFunc(defaultLocation);
                }
            }).catch(error => {
                console.log(error);
            });
        this.handleCountPv();
    }

    getLocationOptions = authedLocation => {
        let provinceOptions = this.options.filter(province => {
            return province.value === authedLocation[0];
        });
        if (provinceOptions.length > 0 && authedLocation.length > 1) {
            provinceOptions = provinceOptions.map(item => {
                return {
                    ...item,
                    disabled: true,
                };
            });
            provinceOptions[0].children = provinceOptions[0].children.filter(city => {
                return city.value === authedLocation[1];
            });
        }
        if (provinceOptions[0].children.length > 0 && authedLocation.length > 2) {
            provinceOptions[0].children = provinceOptions[0].children.map(item => {
                return {
                    ...item,
                    disabled: true,
                };
            });
            provinceOptions[0].children[0].children = provinceOptions[0].children[0].children.filter(district => {
                return district.value === authedLocation[2];
            });
        }
        return provinceOptions;
    }

    changeSelectedOptionsFunc = location => {
        let currLocation = location[location.length - 1];
        let province = currLocation.substr(0, 2);
        let city = currLocation.substr(2, 2);
        let area = currLocation.substr(4, 2);
        let selectedOption = [];
        const proOption = this.changeSelectedOptionsTool(province, province + '0000', this.options);
        if (proOption !== undefined) {
            selectedOption.push(proOption);
            const cityOption = this.changeSelectedOptionsTool(city, province + city + '00', proOption.children);
            if (cityOption !== undefined) {
                selectedOption.push(cityOption);
                const areaOption = this.changeSelectedOptionsTool(area, province + city + area, cityOption.children);
                if (areaOption !== undefined) {
                    selectedOption.push(areaOption);
                }
            }
        }
        this.props.changeSelectedOptions({selectedOptions: selectedOption});
    };
    changeSelectedOptionsTool = (code, area, options) => {
        if (code !== '00') {
            for (const areaOption of options) {
                if (areaOption.value === area) {
                    return areaOption;
                }
            }
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.location) !== JSON.stringify(prevProps.location)) {
            this.setState({location: this.props.location.location});
        }
    }

    handleCountPv = () => {
        const {
            sceneKey,
        } = this.props;
        const key = sceneKey.substr(-2);
        commonApi.countPv(key);
    }

    handleSceneMenuClick = () => {
        setTimeout(this.handleCountPv, 500);
    }

    handleOpenDrawingManager = () => {
        if (this.props.isDrawingManagerOpen) {
            this.props.closeDrawingManager();
        }
        else {
            this.props.openDrawingManager();
        }

        this.props.closeMenuMobile();

    };

    // 管理网格
    handleGridsManager = () => {
        console.log('handleGridsManager ==> ')
    }

    handleOpenMenuClick = () => {
        this.props.openMenuMobile();
    }

    handleMenuMobileClose = () => {
        this.props.closeMenuMobile();
    }
    handleOpenSearchClick = () => {
        this.props.openSearchMobile();
    }

    handleCloseSearchClick = () => {
        this.props.closeSearchMobile();
    }
    /**
     * Header 中切换定位
     * @param {*} value 
     * @param {*} selectedOptions 
     */
    cascaderValue = (value, selectedOptions) => {
        console.log('header changed location ==>', value, selectedOptions);
        this.setState({location: value});
        this.props.changeLocation({location: value});
        this.props.changeSelectedOptions({selectedOptions});
        if (selectedOptions.length > 0) {
            this.props.updateCurrentAdminName(selectedOptions[selectedOptions.length - 1].label);
        }
    };

    handleRegionMobileChange = value => {
        let newValue = [...value];
        while (newValue[newValue.length - 1] === '-') {
            newValue.splice(newValue.length - 1, 1);
        }
        const selectedOptions = [];
        this.getSelectedOptionsFromData(selectedOptions, this.state.options, newValue);
        this.cascaderValue(newValue, selectedOptions);
        // console.log(selectedOptions, newValue);
    }

    getSelectedOptionsFromData = (result, data, value, index = 0) => {
        if (index > value.length - 1) {
            return;
        }
        let currentValue = value[index];

        for (let item of data) {
            if (item.value === currentValue) {
                result.push(item);
                this.getSelectedOptionsFromData(result, item.children, value, index + 1);
            }
        }
    }

    changePage = value => {
        this.setState({page: value});
    };
    backLocation = () => {
        const {
            location: {location},
            selectedOptions,
        } = this.props;
        if (this.state.location.length === 0) {
            message.error('还没有选择当前位置，无法返回上一级');
            return;
        }
        // let splits = location.split(" ");
        let len = location.length;
        if (len < 2) {
            message.error('当前所选位置为省级，无法返回上一级');
            return;
        }
        // let newlocation="";
        // splits.forEach(
        //     (item,index)=>{
        //         if(index<splits.length-2)
        //         newlocation+=item+" ";
        //     }
        // )
        // let arr= splits.filter((value, index)=>{
        //     return (index < splits.length-2);
        // });
        let res = location.slice(0, len - 1);
        this.setState({location: res});
        this.props.changeLocation({location: res});
        if (Array.isArray(selectedOptions) && selectedOptions.length) {
            let resOptions = [].concat(selectedOptions);
            resOptions.pop();
            this.props.changeSelectedOptions({selectedOptions: resOptions});
        }
    };

    logout = () => {
        axios
            .get(
                '/sourceview/auth/logout',
                {},
                {
                    withCredentials: true,
                }
            )
            .then(response => {
                // 输出状态检查返回结果
                // console.log(response.data);
                if (response.data && response.data.respCode === '0000') {
                    // message.error('您已成功退出登录');
                    // this.setState({
                    //     loginState: false,
                    //     name: '',
                    // });
                }
            })
            .catch(error => {
                console.warn(error);
            });
    };

    renderLocationLabel = selectedOptions => {
        // console.log(selectedOptions);
        const {
            adLevel,
            currentAdminName,
        } = this.props;
        if (adLevel === 4) {
            return currentAdminName;
        }
        if (!selectedOptions || selectedOptions.length === 0) {
            return '';
        }
        return selectedOptions[selectedOptions.length - 1];
    }

    renderMenuMobile = toolkitOption => {
        const {
            isMenuMobileOpen,
        } = this.props;
        return (<Drawer
            className={styles.menuDrawerMobile}
            placement="right"
            closable={false}
            onClose={this.handleMenuMobileClose}
            visible={isMenuMobileOpen}
        >
            <div className={styles.menuGroupMobile}>
                场景选择
            </div>
            {this.menu}
            <div className={styles.menuGroupMobile}>
                工具箱
            </div>
            {toolkitOption}
            <div className={styles.menuGroupMobile}>
                {this.state.name}
            </div>
            {this.userOption}
        </Drawer>);
    }

    renderSearch = () => {
        const {pathname} = this.props;
        let searchComponent = null;
        // if (pathname === '/scene/ly') {
        //     searchComponent = <BuildSearch />;
        // }
        // else if (/\/scene\/3k(\/|\/detail(\/)?)?$/.test(pathname)) {
        //     searchComponent = <ThreeSearch />;
        // }
        return searchComponent;
    }

    renderSearchMoblie = searchComponent => {
        const {
            isSearchMobileOpen,
        } = this.props;
        return (<div className={`${styles.searchContainerMoblie} ${isSearchMobileOpen
            ? styles.searchContainerMoblieOpen : ''}`}
        >
            {searchComponent}
            <div className={styles.searchCloseMobile} onClick={this.handleCloseSearchClick}>
                <CloseCircleOutlined />
            </div>
        </div>);
    }

    renderRegionPickerMobile = () => {
        const {selectedOptions} = this.props;
        let text = '选择地区';
        if (selectedOptions.length > 0) {
            text = selectedOptions[selectedOptions.length - 1].label;
        }
        return (<Picker
            title='选择地区'
            value={this.state.location}
            data={this.regionDataMobile}
            onChange={this.handleRegionMobileChange}
        >
            <span className={styles.citySelectMobileBtn}>
                {text}
                &nbsp;
                <CaretDownOutlined />
            </span>
        </Picker>);
    }

    renderMainMenu = () => {
        const {
            sceneKey,
        } = this.props;
        return (<Menu
            onClick={this.handleClick}
            selectedKeys={[sceneKey]}
            className={styles.mainMenu}
        >
            {pageConfigs.map(page => {
                return (<Menu.SubMenu
                    key={page.value}
                    title={page.label}
                    popupClassName={styles.subMenuOverlay}
                >
                    {(page.children || []).map(subPage => {
                        return (<Menu.Item key={subPage.value}>
                            <Link to={`/scene/${subPage.value}`}>{subPage.label}</Link>
                        </Menu.Item>);
                    })}
                </Menu.SubMenu>);
            })}
        </Menu>);
    }

    render() {
        const {
            sceneKey,
            showCascader,
            pageName,
            isMobile,
            showToolkit,
            isDrawingManagerOpen,
        } = this.props;
        const guideMenu = (
            <Menu>
                <Menu.Item key="0">
                    <a target="_blank" rel="noopener noreferrer" href="http://10.168.11.16:8219/baidumap/#index" title="基于百度地图JavaScript GL版API封装的React组件库。">
                        百度专网地图(DuGIS)
                    </a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://huiyan.baidu.com/github/react-bmapgl/">
                        React组件库(React-BMapGL)
                    </a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a target="_blank" rel="noopener noreferrer" href="https://mapv.baidu.com/gl/docs/PointLayer.html">
                        地理信息可视化(MapVGL)
                    </a>
                </Menu.Item>
            </Menu>
        );
        const currPageConfig = pageConfigsMap[sceneKey] || {};

        // if (this.state.loginState === false) {
        //     return <Redirect from="*" to="/login" />;
        // }

        const searchComponent = this.renderSearch();
        let rightComponent = null;
        const toolkitOption = (<Menu>
            <Menu.Item onClick={this.handleOpenDrawingManager}>
                <EditFilled />
                <span className={styles.menuLink}>
                    {isDrawingManagerOpen ? '取消圈选' : '圈选地图'}
                </span>
            </Menu.Item>
            <Menu.Item onClick={this.handleGridsManager}>
                <EditFilled />
                <span className={styles.menuLink}>网格管理</span>
            </Menu.Item>
        </Menu>);
        if (!isMobile) {
            rightComponent = (<div className={styles.headRight}>
                <div className={styles.rightItem}>
                    {searchComponent}
                </div>
                <div className={styles.rightItem}>
                    {/*当地图下钻到网格（adLevel=3）时，显示工具箱*/}
                    {showToolkit && this.props.adLevel === 3 ? <Dropdown
                        overlay={toolkitOption}
                        trigger={['click']}
                        placement="bottomCenter"
                        arrow
                    >
                        <Button
                            className={styles.toolkit}
                            type="primary"
                            shape="round"
                            icon={<AppstoreOutlined />}
                            size="middle"
                        >
                            工具箱
                        </Button>
                    </Dropdown> : null}
                </div>
                <div className={styles.rightItem}>
                    <Dropdown overlay={this.userOption} trigger={['click']} placement="bottomRight" arrow>
                        <span className={styles.userInfoBtn}>
                            <UserOutlined />
                            <span className={styles.userInfo}>
                                <span title={this.state.deptName}>{this.state.name}</span>
                            </span>
                        </span>
                    </Dropdown>
                </div>
                <Dropdown
                    className={styles.operate}
                    overlay={guideMenu}
                >
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        开发指引 <CaretDownOutlined />
                    </a>
                </Dropdown>
                <a className={styles.operate} href="http://10.236.20.81:7005/file/OperationManualV1.docx" rel="noopener noreferrer">操作手册</a>
            </div>
            );
        }
        else {
            rightComponent = (<>
                <div className={styles.headRightMobile}>
                    {searchComponent ? <div className={styles.menuItemMobile} onClick={this.handleOpenSearchClick}>
                        <SearchOutlined className={styles.menuBtnMobile} />
                    </div> : null}
                    <div className={styles.menuItemMobile} onClick={this.handleOpenMenuClick}>
                        <MenuOutlined className={styles.menuBtnMobile} />
                    </div>
                    {this.renderMenuMobile(toolkitOption)}
                </div>
                {this.renderSearchMoblie(searchComponent)}
            </>);
        }
        return (
            <Layout.Header className={styles.header}>
                <div className={styles.headerD}>
                    {/* LOGO + 名字 + 分隔符 - 已注释*/}
                    {/*<img className={styles.logo} src={process.env.PUBLIC_URL + '/image/chinaunicom.png'} />*/}
                    {/*<div className={styles.headTitle}>中国联通集团三大资源可视系统</div>*/}
                    {/*<Divider type="vertical" dashed="true" className={styles.divider} />*/}

                    {isMobile ? this.renderRegionPickerMobile() : null}
                    {/* 沙盘运营 - 已注释*/}
                    {/*<span className={styles.sceneSelector}>{currPageConfig.label}</span>*/}
                    {/* 原工程此处可以下拉选择别的功能*/}
                    {/*<Dropdown*/}
                    {/*    overlay={this.renderMainMenu()}*/}
                    {/*    overlayClassName={styles.mainMenuOverlay}*/}
                    {/*    placement="bottomCenter"*/}
                    {/*>*/}
                    {/*    <span className={styles.sceneSelector}>*/}
                    {/*        {currPageConfig.label}*/}
                    {/*        &nbsp;*/}
                    {/*        <CaretDownOutlined />*/}
                    {/*    </span>*/}
                    {/*</Dropdown>*/}

                    {/* 分隔符 - 已注释*/}
                    {/*<Divider type="vertical" dashed="true" className={styles.divider} />*/}
                    {showCascader ? <div className={styles.citySelect}>
                        <div className={styles.backBtn} onClick={this.backLocation}>
                            <LeftCircleOutlined />
                            <span className={styles.backText}>&nbsp;&nbsp;返回上一级</span>
                        </div>

                        <Divider type="vertical" dashed="true" className={styles.dividerInput} />
                        <EnvironmentOutlined />
                        &nbsp;
                        <Cascader
                            className={styles.location}
                            options={this.state.locationOptions}
                            placeholder="请选择"
                            expandTrigger="hover"
                            allowClear={false}
                            changeOnSelect
                            displayRender={this.renderLocationLabel}
                            onChange={this.cascaderValue}
                            value={this.state.location}
                        />
                    </div> : <span className={styles.sceneSelector}>{pageName}</span>
                    }

                    {rightComponent}
                </div>
            </Layout.Header>
        );
    }
}
export default connect(
    state => ({
        location: state.location,
        adLevel: state.location.adLevel,
        currentAdminName: state.location.currentAdminName,
        selectedOptions: state.global.selectedOptions,
        isMenuMobileOpen: state.global.isMenuMobileOpen,
        isSearchMobileOpen: state.global.isSearchMobileOpen,
        isMobile: state.global.isMobile,
        isDrawingManagerOpen: state.global.isDrawingManagerOpen,
    }),
    {
        changeLocation,
        openDrawingManager,
        closeDrawingManager,
        changeSelectedOptions,
        openMenuMobile,
        closeMenuMobile,
        openSearchMobile,
        closeSearchMobile,
        updateCurrentAdminName,
    }
)(Header);
