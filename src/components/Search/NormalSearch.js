import {Dropdown, Menu, AutoComplete, Divider, Input, Space, Cascader, message} from 'antd';
import {CaretDownOutlined, SearchOutlined} from '@ant-design/icons';
import {useState, useEffect} from 'react';
import styles from './search.module.less';

export default function NormalSearch(props) {
    let {types = ['类别'], list = []} = props;
    const [type, setType] = useState(props.defaultType || types[0]);
    const [value, setValue] = useState('');

    function onTypeChange(item) {
        setType(item);
        setValue('');
        props.onTypeChange && props.onTypeChange(item);
    }

    function onInputChange(e) {
        setValue(e);
        props.onInputChange && props.onInputChange(e);
    }
    function onSelect(val, e) {
        setValue(val);
        props.onSelect && props.onSelect(e);
    }
    useEffect(() => {
        props.getMothods && props.getMothods({
            cleanText() {
                setValue('');
            },
        });
    }, []);
    const searchOption = (
        <Menu>
            {types.map((item, index) => (
                <Menu.Item key={item} onClick={() => onTypeChange(item)}>
                    <span>{item}</span>
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <div className={styles.searchBorder}>
            <span className={styles.rightDropDown}>
                <Dropdown overlay={searchOption} placement="bottomCenter" arrow>
                    <span className={styles.serviceSelect}>
                        {type}
                        &nbsp;
                        <CaretDownOutlined />
                    </span>
                </Dropdown>
                <Divider type="vertical" dashed="true" className={styles.dividerInput} />
            </span>

            <Space>
                {/* <Input className={styles.input} placeholder="请输入" onChange={onInputChange} /> */}
                <AutoComplete
                    className={styles.searchInput}
                    value={value}
                    options={list}
                    dropdownMatchSelectWidth={200}
                    dropdownClassName={styles.dropdown}
                    onSelect={onSelect}
                    onSearch={onInputChange}
                    placeholder="请输入搜索信息"
                />
            </Space>
        </div>
    );
}
