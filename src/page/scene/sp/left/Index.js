import React, {Component} from 'react';
import styles from './Index.module.less';
import SelectTab from './SelectTab';


class Index extends Component {
    constructor(params) {
        super(params);
        this.state = {
        };
    }

    render() {
        return (
            <div className={styles.container} >
                <SelectTab />
            </div>
        );
    }

}


export default Index;
