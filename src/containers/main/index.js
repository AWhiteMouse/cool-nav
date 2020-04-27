import React, { useState } from 'react';
import { Select, Drawer, BackTop } from 'antd';
import CONFIG from '../../common/config';
import { BarsOutlined } from '@ant-design/icons';
import './index.styl';

const { WEBSITE } = CONFIG;
const { Option } = Select;

for (let i = 0; i < WEBSITE.length; i++) {
  WEBSITE[i].id = i;
}

const websites = WEBSITE;

function Main() {
  const [visible, setVisible] = useState(undefined);
  // const [search, setSearch] = useState(undefined);
  // const [websites, setWebsites] = useState(JSON.parse(JSON.stringify(WEBSITE)));

  const options = websites.map(item => {
    return item.children && item.children.map(child => {
      const { siteName, siteLink, description } = child;
      return siteName && siteLink && (
        <Option
          key={siteName}
          value={siteLink}
        >
          {`${siteName} - ${description}`}
        </Option>
      )
    })
  });

  function renderWebsite() {
    if (websites.length === 0) {
      return;
    }

    return websites.map(item => {
      return (
        <div
          key={item.id}
          className="main-website"
        >
          <h5 className="main-website-title" id={`${item.name}`}>{item.name}</h5>
          <div className="main-website-list row">
            {
              item.children && item.children.map(child => {
                return (
                  <div
                    key={child.siteName}
                    className="main-website-list-item col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
                  >
                    <a
                      className="main-website-list-item-link"
                      href={child.siteLink || 'www.baidu.com'}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {
                        child.siteLogo && (
                          <img
                            className="main-website-list-item-logo"
                            src={child.siteLogo}
                            alt=""
                          />
                        )
                      }
                      <div className="main-website-list-item-content">
                        <div className="main-website-list-item-name">{child.siteName}</div>
                        <div className="main-website-list-item-description">{child.description}</div>
                      </div>
                    </a>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    })
  }

  // function onSearch(value) {
  //   console.log('value', value);
  //   setSearch(value);
  //   console.log('search', search);
  // }

  function handleChange(value) {
    window.open(value, '_blank');
  }

  // function settleWebsite() {
  //   console.log('search', search);
  //   const websites = [];
  //   WEBSITE.forEach((item, index) => {
  //     websites.push({
  //       id: item.id,
  //       name: item.name,
  //       children: [],
  //     });
  //     item.children.forEach((child, childIndex) => {
  //       if (
  //         child.siteName.indexOf(search) > -1 ||
  //         child.description.indexOf(search) > -1
  //       ) {
  //         websites[index].children.push(WEBSITE[index].children[childIndex]);
  //       }
  //     })
  //   })
  //   console.log(websites);
  //   setWebsites(websites);
  // }

  function handleSelectFilter(input, option) {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  function handleShowDrawer() {
    setVisible(true);
  }

  function handleHideDrawer() {
    setVisible(false);
  }

  function renderDrawerContent() {
    return websites.map(item => {
      return (
        <p key={item.id}>
          <a
            href={`#${item.name}`}
            className="main-drawer-content-item"
          >
            {item.name}
          </a>
        </p>
      )
    })
  }

  return (
    <div className="main container">
      <header className="main-title">
        <h1>
          <a href="/KuGo/">
            KuGo - 快导航
          </a>
        </h1>
      </header>

      <div className="main-search">
        <Select
          showSearch
          // value={search}
          placeholder="请输入网站名称"
          style={{ width: '100%' }}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          // onSearch={onSearch}
          onChange={handleChange}
          notFoundContent={null}
          optionFilterProp="children"

          // eslint-disable-next-line react/jsx-no-duplicate-props
          filterOption={handleSelectFilter}
        >
          {options}
        </Select>

        {/* <div
          className="main-search-icon"
          onClick={settleWebsite}
        >
          <MonitorOutlined />
        </div> */}
      </div>

      {renderWebsite()}

      {/* <Tooltip placement="right" title="目录"> */}
      <div
        className="main-drawer-handle"
        onClick={handleShowDrawer}
      >
        <BarsOutlined />
      </div>
      {/* </Tooltip> */}


      <Drawer
        title="目录"
        placement="left"
        closable={false}
        onClose={handleHideDrawer}
        visible={visible}
      >
        {renderDrawerContent()}
      </Drawer>

      <BackTop />
    </div>
  );
}

export default Main;
