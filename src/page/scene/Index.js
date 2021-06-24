import { Layout, ConfigProvider } from 'antd';
import Header from './common/Header';
import {
    useParams,
    Switch,
    Route,
    useLocation,
} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
// import ThreeK from './3k/Index';
// import FiveG from './5g/Index';
// import Nc from './nc/Index';
// import Ly from './ly/Index';
import styles from './Index.module.less';
import getQueryValue from './common/toolkit/getLocationSearch';
// import Yyt from './yyt/Index';
import Task from './task/Index.js'
import Work from './work/Index.js'
import Sp from './sp/Index';
import Scheduling from './scheduling/Index'

const PageLayout = () => {
    const params = useParams();
    const location = useLocation();
    const sceneKey = (params.scene || '5g');

    const showCascader = (getQueryValue(location.search, 'showCascader') || 'Y') === 'Y';
    let showToolkit = (getQueryValue(location.search, 'showToolkit') || 'Y') === 'Y';
    if (sceneKey === 'sp') {
        // 顶部是否显示工具箱
        showToolkit = true;
    }
    const pageName = getQueryValue(location.search, 'pageName');
    return (<Layout className={styles.layout}>
        <Header
            sceneKey={sceneKey}
            pathname={location.pathname}
            showCascader={showCascader}
            showToolkit={showToolkit}
            pageName={pageName}
        />
        <Layout.Content className={styles.content}>
            <Switch>
                {/* <Route path="/scene/5g">
                    <FiveG />
                </Route>
                <Route path="/scene/3k" component={ThreeK} />
                <Route path="/scene/nc">
                    <Nc />
                </Route>
                <Route path="/scene/ly">
                    <Ly />
                </Route>
                <Route path="/scene/yyt">
                    <Yyt />
                </Route>
                <Route path="/scene/sp">
                    <Sp />
                </Route>
                <Route path="/scene">
                    <FiveG />
                </Route> */}
                <Route path="/scene/sp">

                    <Sp />
                </Route>
                <Route path="/scene/task">
                    <ConfigProvider locale={locale}>
                        <Task />
                    </ConfigProvider>;

                </Route>
                <Route path="/scene/work">
                    <ConfigProvider locale={locale}>
                        <Work />
                    </ConfigProvider>;

                </Route>
                <Route path="/scene/scheduling">
                    <Scheduling />
                </Route>
                <Route path="/scene">
                    <Sp />
                </Route>
            </Switch>
        </Layout.Content>
        {/* <Layout.Footer style={{ textAlign: 'center' }}> </Layout.Footer> */}
    </Layout>);
};

export default PageLayout;
