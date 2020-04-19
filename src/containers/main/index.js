import React, { useState } from 'react';
import { Select, Drawer, BackTop } from 'antd';
import CONFIG from '../../common/config';
import { BarsOutlined } from '@ant-design/icons';
import './index.styl';

const { WEBSITE } = CONFIG;
const { Option } = Select;

const websites = WEBSITE;

function Main() {
  const [visible, setVisible] = useState(undefined);
  // const [search, setSearch] = useState(undefined);
  // const [websites, setWebsites] = useState(JSON.parse(JSON.stringify(WEBSITE)));

  const options = websites.map(item => {
    return item.children && item.children.map(child => {
      const { siteName, siteLink } = child;
      return siteName && siteLink && (
        <Option
          key={siteName}
          value={siteLink}
        >
          {siteName}
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
          className="main-body"
        >
          <h6 className="main-body-title" id={`${item.name}`}>{item.name}</h6>
          <div className="main-body-list row">
            {
              item.children && item.children.map(child => {
                return (
                  <div
                    key={child.siteName}
                    className="main-body-list-item col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
                  >
                    <a
                      className="main-body-list-item-link"
                      href={child.siteLink || 'www.baidu.com'}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {
                        child.siteLogo && (
                          <img
                            className="main-body-list-item-logo"
                            src={child.siteLogo}
                            alt=""
                          />
                        )
                      }
                      <div className="main-body-list-item-content">
                        <div className="main-body-list-item-name">{child.siteName}</div>
                        <div className="main-body-list-item-description">{child.description}</div>
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

  function handleShowDrawer() {
    setVisible(true);
  }

  function handleHideDrawer() {
    setVisible(false);
  }

  function renderDrawerContent() {
    return websites.map(item => {
      return (
        <p>
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
        <h1>CoolNav - 网站集锦</h1>
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
          filterOption={(input, option) => {
            return option.children.indexOf(input) >= 0
          }}
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

      <div
        className="main-drawer-handle"
        onClick={handleShowDrawer}
      >
        <BarsOutlined />
      </div>

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
