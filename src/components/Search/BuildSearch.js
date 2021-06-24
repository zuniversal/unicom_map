import NormalSearch from './NormalSearch';
import {useSelector, useDispatch} from 'react-redux';
import {changeBuildSelected, changeBuildManSelected} from '@/app/reducer/ly/lySelect';
import API from '@/page/scene/ly/api';
import {useEffect, useState, useRef} from 'react';

export default function BuildSearch() {
    const {location} = useSelector(state => state.location);
    const regionId = location[location.length - 1];
    const searchRef = useRef({});

    const types = ['楼长', '楼宇'];
    const [type, setType] = useState(types[0]);
    const [text, setText] = useState();
    let [list, setList] = useState([]);
    const dispatch = useDispatch();

    const {buildManSelected, buildSelected} = useSelector(state => state.lySelect);

    function changeType(type) {
        setType(type);
        setList([]);
    }
    function changeInput(input) {
        setText(input);
    }
    function onSelect(info) {
        if (type === types[1]) {
            dispatch(changeBuildSelected(info.data));
        }
        else if (type === types[0]) {
            dispatch(changeBuildManSelected(info.data));
        }
    }
    useEffect(() => {
        // 销毁时清除已搜索内容状态
        return function () {
            dispatch(changeBuildSelected(undefined));
            dispatch(changeBuildManSelected(undefined));
        };
    }, []);
    useEffect(() => {
        if (!type || !text) {
            setList([]);
            return;
        }
        if (type === types[1]) {
            API.searchBuild(text, regionId).then(data => {
                data = data.map(item => ({
                    value: item.name + '-' + item.address,
                    data: item,
                }));
                setList(data);
            });
        }
        else if (type === types[0]) {
            API.searchPeople(text, regionId).then(data => {
                data = data.map(item => ({
                    value: item.name + '-' + item.id,
                    data: item,
                }));
                setList(data);
            });
        }
    }, [type, text]);

    useEffect(async () => {
        if (!buildManSelected && !buildSelected) {
            searchRef.current.cleanText && searchRef.current.cleanText();
            setList([]);
        }
    }, [buildManSelected, buildSelected]);

    return (
        <NormalSearch
            defaultType={types[0]}
            types={types}
            list={list}
            getMothods={r => searchRef.current = r}
            onTypeChange={changeType}
            onInputChange={changeInput}
            onSelect={onSelect}
        />
    );
}
