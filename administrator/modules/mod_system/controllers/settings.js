/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let services = require('../services'),
    module_name = 'mod_system',
    _module = new __viewRender('backend', module_name);

_module.web_settings = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/settings`},
        saveButton: {access: true, link: `#`, text: ' Lưu lại'}
    });

    __models.Objects.findOne({key: 'seo:settings'}, function (err, re) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        }
        _module.render(req, res, 'web_settings', {
            title: 'Cấu hình Search Engine Optimization',
            toolbar: toolbar.render(),
            meta: re
        })
    });
};

_module.web_settings_update = function (req, res) {
    __models.Objects.update({key: 'seo:settings'}, req.body).exec(function (err, re) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        }
        req.flash('success', 'Cập nhật thông tin thành công!');
        res.redirect(`/${__config.admin_prefix}/settings`);
    })
};

_module.report = function (req, res) {
    _module.render(req, res, 'report', {
        title: 'Gửi báo cáo tới hệ thống'
    });
};

_module.module_install = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/modules/settings`},
        createButton: {access: true, link: `#`, text: ' Thêm module'}
    });

    let moduleIgnore = '' || '*';
    let listModuleExtends = {};
    __.getGlobbedFiles(__base + `/administrator/modules/${moduleIgnore}/module.js`).forEach(function (path) {
        require(path)(listModuleExtends);
    });

    _module.render(req, res, 'module_install', {
        title: 'Cài đặt modules',
        toolbar: toolbar.render(),
        modules: listModuleExtends
    })
};

module.exports = _module;