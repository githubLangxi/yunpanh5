import Vue from 'vue'

! function (factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define(['exports'], factory);
    } else {
        factory(window['rt'] = {});
    }
}(function (utExports) {
    'use strict';

    var rt = typeof utExports !== 'undefined' ? utExports : {};


    var odataRequestUrl = "../api/crmdata/";

    rt.getLable = function (vm, label, value) {
        if (!rt.isNullOrWhiteSpace(value)) {
            console.log(vm.$t('a.c'));
        }
        return "123"
    }


    Date.prototype.getZoneTime = function (isDateTime) {
        var a;
        var defaultTimeZone = a || -8;
        var date = new Date(this);
        var d = new Date();
        var realTimeZoneOffset = defaultTimeZone - d.getTimezoneOffset() / 60;
        var timeWithTimezone = new Date(date.getTime() + realTimeZoneOffset * 3600000);
        if (isDateTime) {
            return rt.formatDateTime(timeWithTimezone, 'yyyy-mm-dd HH:MM:ss');
        }
        return rt.formatDateTime(timeWithTimezone, 'yyyy-mm-dd');
    }

    Date.prototype.getSystemTime = function (isDateTime) {

        var a;
        var defaultTimeZone = a || -8;
        var date = new Date(this);
        var d = new Date().getTimezoneOffset();
        var realTimeZoneOffset = d / 60 - defaultTimeZone;
        var timeWithTimezone = null;
        if (isDateTime) {
            timeWithTimezone = new Date(date.getTime() + realTimeZoneOffset * 3600000);
            return rt.formatDateTime(timeWithTimezone, 'yyyy-mm-dd HH:MM:ss')
        }
        timeWithTimezone = (d > 0) ? new Date(date.getTime() + 24 * 3600000) : new Date(date.getTime());
        return rt.formatDateTime(timeWithTimezone, 'yyyy-mm-dd');
    }



    /**
     * 异步创建实体记录
     * @param  {String} entitySetName 实体的逻辑名称(复数)
     * @param  {[type]} entity        要创建的记录对象，属性是要创建的记录的字段名称，属性值是字段的值
     * @return {Promise}               [description]
     */
    rt.createAsync = function (entitySetName, entity) {
        return new Promise(function (resolve, reject) {
            if (!rt.isString(entitySetName)) {
                throw new Error('rt.createAsyn entitySetName parameter must be a string.')
            }
            if (rt.isNull(entity)) {
                throw new Error('rt.createAsyn entity parameter must not be null or undefined.')
            }

            rt.post(odataRequestUrl + 'create/' + entitySetName, entity)
                .then(function (res) {
                    resolve(res.headers['odata-entityid'].split('(')[1].replace(')', ''))
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

    /**
     * 异步删除一条记录
     * @param  {string} entitySetName 实体的逻辑名称(复数)
     * @param  {string} entityId      实体记录的主键，GUID
     * @return {Promise}               [description]
     */
    rt.deleteAsync = function (entitySetName, entityId) {
        return new Promise(function (resolve, reject) {
            if (!rt.isString(entitySetName)) {
                throw new Error('rt.deleteAsyn entitySetName parameter must be a string.')
            }
            if (!rt.isString(entityId)) {
                throw new Error('rt.deleteAsyn entityId parameter must be a string.')
            }

            rt.post(odataRequestUrl + 'delete/' + entitySetName + '(' + entityId.replace('{', '').replace('}', '') + ')')
                .then(function (res) {
                    resolve(res.status)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

    /**
     * 根据ID异步查询单条数据
     * @param  {string} entitySetName 要查询的实体复数名称(ID)
     * @param  {boolean} formatted 是否格式化
     * @return {Promise}           [description]
     */
    rt.retrieveAsync = function (queryString, useFormattedValue) {
        return new Promise(function (resolve, reject) {
            if (!rt.isString(queryString)) {
                throw new Error('rt.retrieve queryString parameter must be a string.')
            }
            if (!rt.isBoolean(useFormattedValue)) {
                throw new Error('rt.retrieveMultiple useFormattedValue parameter must be a boolean.')
            }
            var url = odataRequestUrl + 'Retrieve/' + queryString

            //添加头部
            let config = {}
            if (useFormattedValue) {
                config = {
                    headers: {
                        Prefer: 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"'
                    }
                }
            }
            rt.get(url, config)
                .then(function (res) {
                    resolve(res.data)
                })
                .catch(function (err) {
                    resolve(err)
                })
        })
    }

    /**
     * 异步查询多条数据
     * @param  {string} queryString 查询字符串，包括实体的逻辑名称(复数)
     * @param  {boolean} formatted 返回的结果是否格式化
     * @return {Promise}           [description]
     */
    rt.retrieveMultipleAsync = function (queryString, useFormattedValue) {
        return new Promise(function (resolve, reject) {
            if (!rt.isString(queryString)) {
                throw new Error('rt.retrieveMultiple queryString parameter must be a string.');
            }
            if (!rt.isBoolean(useFormattedValue)) {
                throw new Error('rt.retrieveMultiple useFormattedValue parameter must be a boolean.');
            }
            var url = odataRequestUrl + 'Retrieve/' + queryString;

            //添加头部
            let config = {}
            if (useFormattedValue) {
                config = {
                    headers: {
                        Prefer: 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"'
                    }
                }
            }

            rt.get(url, config)
                .then(function (res) {
                    resolve(res.data)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

    /**
     * 异步查询数据fetch
     * @param  {string} entityName        查询实体名（根据CRM的WebApi要求，实体名需要使用复数形式，如accounts）
     * @param  {string} fetchXml          传入的查询fetchXml,注意此处用+拼接fetch,不能使用"\"进行转义，否则会无法找到api资源
     * @param  {boolean} useFormattedValue 返回的结果是否格式化
     * @return {Promise}                   [description]
     */
    rt.fetchAsync = function (entityName, fetchXml, useFormattedValue) {
        return new Promise(function (resolve, reject) {
            if (!rt.isBoolean(useFormattedValue)) {
                throw new Error('rt.fetchAsync useFormattedValue parameter must be a boolean.');
            }
            if (rt.isNullOrWhiteSpace(entityName)) {
                throw new Error('rt.fetchAsync entityName parameter must be string.')
            }
            if (rt.isNullOrWhiteSpace(fetchXml)) {
                throw new Error('rt.fetchAsync fetchXml parameter must be valuable.')
            }
            var fetchStr = odataRequestUrl + 'Retrieve/' + entityName + '?fetchXml=' + fetchXml;
            if (useFormattedValue) {

            }
            rt.get(fetchStr)
                .then(function (res) {
                    reject(res.data);
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

    /**
     * 异步更新一条记录
     * @param  {string} entitySetName 实体的逻辑名称
     * @param  {string} entityId      实体记录的主键，GUID
     * @param  {string} entity        要更新的记录对象，属性是要更新的记录的字段名称，属性值是字段的值
     * @return {Promise}               [description]
     */
    rt.updateAsync = function (entitySetName, entityId, entity) {
        return new Promise(function (resolve, reject) {
            if (!rt.isString(entitySetName)) {
                throw new Error('rt.updateAsync entitySetName parameter must be a string.')
            }
            if (!rt.isString(entityId)) {
                throw new Error('rt.updateAsync entityId parameter must be a string.')
            }
            if (rt.isNull(entity)) {
                throw new Error('rt.updateAsync entity parameter must not be null or undefined.')
            }

            var url = odataRequestUrl + 'Update/' + entitySetName + '(' + entityId.replace('{', '').replace('}', '') + ')'
            rt.post(url, entity)
                .then(function (res) {
                    resolve(res.headers['odata-entityid'].split('(')[1].replace(')', ''))
                })
                .catch(function (err) {
                    resolve(err)
                })
        })
    }

    /**
     * 异步更新实体一条记录
     * @param  {string} entitySetName 实体的逻辑名称(复数)
     * @param  {string} entityId      实体记录的主键，GUID
     * @param  {string} fieldName     要更新的字段的逻辑名称
     * @param  {string} fieldValue    要更新的字段的值
     * @return {Promise}               [description]
     */
    rt.updateSingleFieldAsync = function (entitySetName, entityId, fieldName, fieldValue) {
        return new Promise(function (resolve, reject) {
            if (!rt.isString(entitySetName)) {
                throw new Error('rt.updateSingleFieldAsync entitySetName parameter must be a string.')
            }
            if (!rt.isString(entityId)) {
                throw new Error('rt.updateSingleFieldAsync entityId parameter must be a string.')
            }

            rt.post(odataRequestUrl + 'Update/' + entitySetName + '(' + entityId.replace('{', '').replace('}', '') + ')/' + fieldName, {
                'value': fieldValue
            })
                .then(function (res) {
                    resolve(res.headers['odata-entityid'].split('(')[1].replace(')', ''))
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

    /**
     * 获取指定实体的字段的值(异步）
     * @param  {string} id                实体的guid
     * @param  {string} typeName          实体类型名称（复数）
     * @param  {string} returnField       如果要返回所有的字段，保持为空或者是 * ，多字段用，连接
     * @param  {Boolean} useFormattedValue 返回的结果是否格式化
     * @return {Promise}                   [description]
     */
    rt.getFieldValueAsync = function (id, typeName, returnField, useFormattedValue) {
        return new Promise(function (resolve, reject) {
            if (!rt.isBoolean(useFormattedValue)) {
                throw new Error('rt.getFieldValueAsync useFormattedValue parameter must be a boolean.')
            }
            if (rt.isNullOrWhiteSpace(id)) {
                throw new Error('rt.getFieldValueAsync id parameter must be string.')
            }
            if (rt.isNullOrWhiteSpace(typeName)) {
                throw new Error('rt.getFieldValueAsync typeName parameter must be string.')
            }

            var queryString = odataRequestUrl + 'Retrieve/' + typeName + '(' + id.replace('{', '').replace('{', '') + ')'
            if (!rt.isNullOrWhiteSpace(returnField) && returnField != "*") {
                queryString += '?$select=' + returnField
            }

            rt.get(queryString)
                .then(function (res) {
                    resolve(res.data)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

    /**
     * 获取系统参数的值
     * @param  {string} paramName 系统参数的名称
     * @return {string}           系统参数的值
     */
    rt.getParameterValue = function (paramName) {
        var result
        var fetchXml = "<fetch mapping='logical' version='1.0'>" +
            "<entity name='new_systemparameter'>" +
            "<attribute name='new_value' />" +
            "<filter>" +
            "<condition attribute='new_name' operator='eq' value='" + paramName + "' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>"

        return Promise.resolve(rt.fetchAsync('new_systemparameters', fetchXml, false).then((res) => {
            return res.value[0].new_value
        }))
    }



    /**
     * 导出到excel
     * @param {string} filename 文件名称
     * @param {object} val 导出的数据
     * @param {string} excelTitle 导出的列头集合
     * @param {string} exclude 排除的字段集合
     */
    rt.export2Excel = function (filename, val, excelTitle, exclude) {
        var excludelist = [];

        if (exclude) {
            excludelist = exclude.split(',');
        }
        var explorer = ''; //浏览器类型
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            explorer = 'ie';
        //IE浏览器导出
        if (explorer == 'ie') {
            var arrData = typeof val != 'object' ? JSON.parse(val) : val;
            try {
                var oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
            } catch (e) {
                alert("无法启动Excel，请确保电脑中已经安装了Excel!\n\n如果已经安装了Excel，" + "请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → ActiveX 控件和插件 → 对未标记为可安全执行脚本的ActiveX 控件初始化并执行脚本 → 启用 → 确定");
            }
            var oWB = oXL.Workbooks.Add(); //获取workbook对象
            var oSheet = oWB.ActiveSheet; //激活当前sheet
            var Lenr = arrData.length; //取得表格行数
            for (var i = 0; i < excelTitle.length; i++) {
                oSheet.Cells(1, i + 1).value = excelTitle[i]; //赋值
            }


            for (var i = 0; i < Lenr; i++) {
                var td = 0;
                for (var j in arrData[i]) {
                    if (excludelist.length > 0 && excludelist.indexOf(j) >= 0) continue;
                    oSheet.Cells(i + 2, td + 1).value = arrData[i][j]; //赋值
                    td++;
                }
            }
            oXL.Visible = true;

            var fname = oXL.Application.GetSaveAsFilename(filename + ".xls", "Excel Spreadsheets (*.xls), *.xls");
            oWB.SaveAs(fname);
            oWB.Close();
            oXL.Quit();
        }
        //非IE浏览器导出
        else {
            var arrData = typeof val != 'object' ? JSON.parse(val) : val;
            var excel = '<table>';
            var row = "<tr>";
            for (var i = 0; i < excelTitle.length; i++) {
                row += "<td>" + excelTitle[i] + "</td>";
            }
            excel += row + "</tr>";
            for (var i = 0; i < arrData.length; i++) {
                var row = "<tr>";
                for (var j in arrData[i]) {
                    if (excludelist.length > 0 && excludelist.indexOf(j) >= 0) continue;
                    var td = arrData[i][j];
                    row += "<td>" + td + "</td>";
                }
                excel += row + "</tr>";
            }
            excel += "</table>";
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                "xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
            excelFile += '; charset=UTF-8">';
            excelFile += "<head>";
            excelFile += "<!--[if gte mso 9]>";
            excelFile += "<xml>";
            excelFile += "<x:ExcelWorkbook>";
            excelFile += "<x:ExcelWorksheets>";
            excelFile += "<x:ExcelWorksheet>";
            excelFile += "<x:Name>";
            excelFile += "sheet";
            excelFile += "</x:Name>";
            excelFile += "<x:WorksheetOptions>";
            excelFile += "<x:DisplayGridlines/>";
            excelFile += "</x:WorksheetOptions>";
            excelFile += "</x:ExcelWorksheet>";
            excelFile += "</x:ExcelWorksheets>";
            excelFile += "</x:ExcelWorkbook>";
            excelFile += "</xml>";
            excelFile += "<![endif]-->";
            excelFile += "</head>";
            excelFile += "<body>";
            excelFile += excel;
            excelFile += "</body>";
            excelFile += "</html>";
            var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
            var link = document.createElement("a");
            link.href = uri;
            link.style = "visibility:hidden";
            //导出文件名
            link.download = filename + ".xls";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }


    /**
     * @param {string} 实体名称
     * @param {string} 实体id
     */
    rt.revoke = function (entityname, entityid) {
        var data = {
            EntityId: entityid,
            EntityTypeName: entityname,
        }
        return rt.post("../api/CrmFlow/revoke", data)
            .then(function (res) {
                rt.showSuccessToast(res);
                return Promise.resolve();
            }).catch((error) => {
                rt.showErrorToast(error);
                return Promise.reject(error);
            });
    }


    /**
     * 获取网站的根地址
     */
    rt.getBaseUrl = function () {
        if (process.env.NODE_ENV === 'production') {
            return "";
        }

        var baseUrl = localStorage.serverAddress;
        if (!baseUrl.endWith("/")) {
            baseUrl += "/";
        }

        return baseUrl;
    }

    /**
     * 通过Get方法调用WebAPI
     * @param {string} apiUrl WebAPI的URL地址
     * @param {*} params 传递的参数
     * @returns {string} response结果
     */
    rt.get = function (apiUrl, params) {
        var queryString = null;
        if (!this.isNull(params)) {
            for (var key in params) {
                queryString += '&' + key + '=' + encodeURIComponent(params[key]);
            }

            queryString = queryString.substr(1);
        }

        if (!this.isNullOrWhiteSpace(queryString)) {
            apiUrl += "?" + queryString;
        }
        return Vue.http.get(apiUrl)
            .then(function (response) {
                if (response.data != null && response.data.ErrorCode != null) {
                    if (response.data.ErrorCode !== 0) {
                        return Promise.reject(response.data.Message);
                    } else {
                        return response.data.Data;
                    }
                }
                return response.data;
            }, function (errorResponse) {
                if (errorResponse.status === 401) {
                    alert("您没有权限访问该资源.");
                    return;
                }
                return Promise.reject(errorResponse.statusText);
            });
    };

    /**
     * 通过post的方法调用WebAPI
     * @param {string} apiUrl WebAPI的URL地址
     * @param {*} para 要post到服务器端的数据
     * @returns {string} response结果
     */
    rt.post = function (apiUrl, data, params) {
        return Vue.http.post(apiUrl, data, params)
            .then(function (response) {
                if (response.data != null && response.data.ErrorCode != null) {
                    if (response.data.ErrorCode !== 0) {
                        return Promise.reject(response.data.Message);
                    } else {
                        return response.data.Data;
                    }
                }
                return response.data;
            }, function (errorResponse) {
                if (errorResponse.status === 401) {
                    alert("您没有权限访问该资源.");
                    return;
                }
                return Promise.reject(errorResponse.statusText);
            });
    };



    var loadingInstance; //loading实例
    /**
     * 打开lookup
     * @param {string} url lookuppage url
     */

    rt.sLookup = function (url) {
        var l = (screen.availWidth - 560) / 2;
        var t = (screen.availHeight - 614) / 2;

        window.open(url, "_blank", "width=560,height=614,top=" + t + ",left=" + l + ",toolbar=no,menubar=no, scrollbars=no, resizable=no, location=no, status=no");
    }

    /**
     * 打开portal单据编辑界面
     * @param {string} url lookuppage url
     */

    rt.editWindow = function (url) {
        var l = (screen.availWidth - 1440) / 2;
        var t = (screen.availHeight - 900) / 2;

        window.open(url, "_blank", "width=1440,height=900,top=" + t + ",left=" + l + ",toolbar=no,menubar=no, scrollbars=no, resizable=no, location=no, status=no");
    }

    /**
     * showAlertDialog的简化写法，按钮的显示文字固定为“确定”。
     * @param {String} content 消息提示的正文
     */
    rt.alert = function (content, callback) {
        rt.showAlertDialog('提示', content, {
            callback: callback
        });
    };


    /**
     * 弹出提示对话框，可以自定义按钮的显示文字；返回Promise对象。
     * @param  {string} title                提示标题
     * @param  {string} content              提示正文
     * @param  {string} options
     */
    rt.showAlertDialog = function (title, content, options) {
        return Vue.prototype.$alert(content, title, options)
    }

    /**
     * showConfirmDialog简化写法，按钮的显示文字固定为“确定”和“取消”。
     * @param  {string} content 消息提示正文
     * @return {Promise}         在then和catch中执行确定和取消的操作
     */
    rt.confirm = function (content) {
        return rt.showConfirmDialog('', content, '确定', '取消', 'info')
    }

    /**
     * 弹出confirm
     * @param  {string} title                消息提示标题
     * @param  {string} content              消息提示正文
     * @param  {sting} confirmButtonContent  确定按钮文字
     * @param  {string} CancelButtonContent  取消按钮文字
     * @param  {sting} confirmType           提示类型
     * @return {Promise}
     */
    rt.showConfirmDialog = function (title, content, confirmButtonContent, CancelButtonContent, confirmType) {
        if (!rt.isString(title)) {
            throw new Error('rt.showConfirmDialog title parameter must be string.');
        }
        if (!rt.isString(content)) {
            throw new Error('rt.showConfirmDialog content parameter must be string.');
        }
        if (!rt.isString(confirmButtonContent)) {
            throw new Error('rt.showConfirmDialog confirmButtonContent parameter must be string.');
        }
        if (!rt.isString(CancelButtonContent)) {
            throw new Error('rt.showConfirmDialog CancelButtonContent parameter must be string.');
        }
        return Vue.prototype.$confirm(content, title, {
            confirmButtonText: confirmButtonContent,
            CancelButtonText: CancelButtonContent,
            type: confirmType
        })
    }

    /**
     * 打开loading提示
     * @param  {string} content 等待提示内容
     * @param  {obje} dom       加载dom对象，不传对象则全屏
     */
    rt.showLoadingToast = function (content, dom) {
        if (!rt.isNull(loadingInstance)) {
            return;
        }
        let options = {};
        if (!rt.isNull(content)) {
            options.text = content
        }
        if (!rt.isNull(dom)) {
            options.target = dom
        }
        loadingInstance = Vue.prototype.$loading(options)
    }

    /**
     * 关闭loading
     */
    rt.hideLoadingToast = function () {
        if (rt.isNull(loadingInstance)) {
            return;
        }
        loadingInstance.close();
        loadingInstance = null;
    }

    /**
     * 弹出错误文字提示
     * @param  {string}  content 提示内容
     * @param  {Boolean} isClose 是否可手动关闭
     */
    rt.showErrorToast = function (content, isClose) {
        Vue.prototype.$message({
            showClose: isClose,
            message: content,
            type: 'error'
        });
    };

    /**
     * 弹出成功的文字提示
     * @param  {string}  content 提示内容
     * @param  {Boolean} isClose 是否可手动关闭
     */
    rt.showSuccessToast = function (content, isClose) {
        Vue.prototype.$message({
            showClose: isClose,
            message: content,
            type: 'success'
        });
    };

    /**
     * 返回上一级
     */
    rt.goBack = function () {
        Vue.router.go(-1)
    }




    /**
     * 注销
     */
    rt.logout = function () {
        rt.showConfirmDialog('', '确认注销？', '确定', '取消', 'warning')
            .then(function () {
                Vue.prototype.$auth.logout();
            })
    }

    rt.logTime = function(message) {
      let time1 = new Date();
      let hour = time1.getHours();
      let min = time1.getMinutes();
      let sec = time1.getSeconds();
      let millsec = time1.getMilliseconds();
      let str = "";
      if (hour < 10) str += "0";
      str += hour;
      str += ":"
      if (min < 10) str += "0";
      str += min;
      str += ":";
      if (sec < 10) str += "0";
      str += sec;
      str += ".";
      if (millsec < 10) sec += "0";
      if (millsec < 100) sec += "0";
      str += millsec;
      if (message)
      {
        str += "  ";
        str += message;
      }
      console.log(str);
    }

    /**
     * 获取用户Id
     * @return {string}
     */
    rt.getUserId = function () {
        return Vue.prototype.$auth.getUserInfo().systemUserId
    }

    /**
     * 获取用户账号
     * @return {string}
     */
    rt.getUserName = function () {
        return Vue.prototype.$auth.getUserInfo().userCode
    }
    /**
     * 分页查询时，获取每页显示的记录数。
     */
    rt.getPaginationSize = function () {
        return 50;
    };

    rt.refreshParentPage = function () {
        ///	<summary>刷新当前页面的父页面（将其打开的页面）</summary>
        if (window.top != null && window.top.opener != null) {
            window.top.opener.location.reload();
        }
    };

    rt.showFullWindow = function (url) {
        ///	<summary>打开新窗口，窗口大小为全屏</summary>
        ///	<param name="url" type="String">页面URL地址</param>
        var width = screen.width;
        var height = screen.height;
        return this.showWindow(url, {
            width: width,
            height: height
        });
    };

    rt.showLargeWindow = function (url) {
        ///	<summary>打开新窗口，窗口大小为 1024 * 768 </summary>
        ///	<param name="url" type="String">页面URL地址</param>
        return this.showWindow(url, {
            width: 1024,
            height: 768
        });
    };

    rt.showSmallWindow = function (url) {
        ///	<summary>打开新窗口，窗口大小为 400 * 300 </summary>
        ///	<param name="url" type="String">页面URL地址</param>
        return this.showWindow(url, {
            width: 400,
            height: 300
        });
    };

    rt.showWindow = function (url, config) {
        ///	<summary>打开新页面，默认800*600</summary>
        ///	<param name="url" type="String">页面URL地址</param>
        ///	<param name="config" type="Object">窗体的配置参数，包含width、height</param>
        if (this.isNull(config)) {
            config = {};
        }

        if (this.isNull(config.width) || config.width === 0) {
            config.width = 800;
        }

        if (this.isNull(config.height) || config.height === 0) {
            config.height = 600;
        }

        var WINDOWS_TASK_BAR_HEIGHT = 40; //任务栏的高度
        var winTop = Math.round((screen.height - config.height - WINDOWS_TASK_BAR_HEIGHT) * 0.5);
        var winLeft = Math.round((screen.width - config.width) * 0.5);

        var strFeatures = "help=no,maximize=no,minimize=no,menubar=no,toolbar=no,status=no,location=no,resizable=no" + ",width=" + config.width + ",height=" + config.height + ",top=" + winTop + ",left=" + winLeft;

        window.open(url, "_blank", strFeatures);
    };


    /**
     * 刷新页面
     */
    rt.refresh = function () {
        Vue.router.go(0)
    }

    /**
     * 得到日期年月日等加数字后的日期
     */
    Date.prototype.dateAdd = function (datepart, number) {
        var d = new Date(this.getTime());

        var k = {
            'y': 'FullYear',
            'q': 'Month',
            'm': 'Month',
            'w': 'Date',
            'd': 'Date',
            'h': 'Hours',
            'n': 'Minutes',
            's': 'Seconds',
            'ms': 'MilliSeconds'
        };
        var n = {
            'q': 3,
            'w': 7
        };
        eval('d.set' + k[datepart] + '(d.get' + k[datepart] + '()+' + ((n[datepart] || 1) * number) + ')');
        return d;
    };

    /**
     * 计算两日期相差的日期年月日等
     */
    Date.prototype.dateDiff = function (datepart, enddate) {
        var d = this,
            i = {},
            t = d.getTime(),
            t2 = enddate.getTime();
        i['y'] = enddate.getFullYear() - d.getFullYear();
        i['q'] = i['y'] * 4 + Math.floor(enddate.getMonth() / 4) - Math.floor(d.getMonth() / 4);
        i['m'] = i['y'] * 12 + enddate.getMonth() - d.getMonth();
        i['ms'] = enddate.getTime() - d.getTime();
        i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
        i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
        i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
        i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
        i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
        return i[datepart];
    };

    Date.prototype.toUniversalTime = function () {
        ///<summary> 将日期时间转换成UTC时间</summary>
        ///<param name="date" type="Date"> 要转换的日期时间</param>
        var yearUTC = this.getUTCFullYear();
        var monthUTC = this.getUTCMonth();
        var dayUTC = this.getUTCDate();
        var hoursUTC = this.getUTCHours();
        var minutesUTC = this.getUTCMinutes();
        var secondsUTC = this.getUTCSeconds();

        return new Date(yearUTC, monthUTC, dayUTC, hoursUTC, minutesUTC, secondsUTC);
    };

    /**
     * 判断一个字符串是否包含某字符串
     * @param substr 包含的字符串
     * @param ignoreCase 是否忽略大小写
     * @returns {boolean} 如果包含，则返回true，否则返回 false
     */
    String.prototype.contains = function (substr, ignoreCase) {
        if (ignoreCase === null || ignoreCase === undefined) {
            ignoreCase = false;
        }

        if (ignoreCase) {
            return this.search(new RegExp(substr, "i")) > -1;
        } else {
            return this.search(substr) > -1;
        }
    };

    /**
     * 判断一个字符串是不是以某字符串结尾
     * @param s
     * @returns {boolean} 如果是，则返回true，否则返回 false
     */
    String.prototype.endWith = function (s, ignoreCase) {
        if (s === null || s === "" || this.length === 0 || s.length > this.length) {
            return false;
        }
        var ns = this.substring(this.length - s.length);
        if (ignoreCase) {
            return ns.toLowerCase() === s.toLowerCase();
        } else {
            return ns === s;
        }
    };

    /**
     * 字符格式化，同C# String.Format方法
     */
    String.prototype.format = function () {
        var content = this;
        for (var i = 0; i < arguments.length; i++) {
            var replacement = '{' + i + '}';
            content = content.replace(replacement, arguments[i]);
        }
        return content;
    };

    /**
     * 判断一个字符串是不是以某字符串开头
     * @param s
     * @returns {boolean} 如果是，则返回true，否则返回 false
     */
    String.prototype.startWith = function (s, ignoreCase) {
        if (s === null || s === "" || this.length === 0 || s.length > this.length) {
            return false;
        }
        var ns = this.substr(0, s.length);
        if (ignoreCase) {
            return ns.toLowerCase() === s.toLowerCase();
        } else {
            return ns === s;
        }
    };

    /**
     * 移除字符串前后的空格或其它特殊字符，同C#中的Trim方法。
     */
    String.prototype.trim = function (trimChars) {
        var result = this;

        if (typeof trimChars !== "string" || trimChars.length <= 0) {
            trimChars = " ";
        }

        var count = result.length;

        while (count > 0) { //trim the head position
            if (trimChars.indexOf(result[0]) >= 0) {
                result = result.substring(1);
                count--;
            } else {
                break;
            }
        }
        while (count > 0) { //trim the tail position
            if (trimChars.indexOf(result[count - 1]) >= 0) {
                result = result.substring(0, count - 1);
                count--;
            } else {
                break;
            }
        }
        return result;
    };


    /**
     * 将标准的经纬度转换成百度的火星坐标
     * @param  {number} longitude 转换的经度
     * @param  {number} latitude  转换的纬度
     * @return {[type]}           [description]
     */
    rt.convertGPS2BaiduLocation = function (longitude, latitude, success) {
        var url = "http://api.map.baidu.com/geoconv/v1/?coords=" + longitude + "," + latitude + "&from=1&to=5&ak=ROninBdEIu93CBGDHc3fSPHE&callback=MYCALLBACK";

        this.jsonp(url, function (data) {
            success(data.result[0]);
        });
    };

    /**
     * 延迟执行
     * @param {string} action 执行动作
     * @param {int} delayMilliseconds 延迟的时间，单位：毫秒
     */
    rt.delay = function (action, delayMilliseconds) {
        if (!this.isFunction(action)) {
            throw new Error("第一个参数必须是function对象.");
        }

        if (this.isNull(delayMilliseconds)) {
            delayMilliseconds = 2 * 1000;
        }

        setTimeout(action, delayMilliseconds);
    };

    /**
     * 日期格式化
     * @param  {date} date   待格式化日期
     * @param  {string} mask 格式
     * @param  {[type]} utc  [description]
     * @return {string}      格式化后的日期字符串
     */
    rt.formatDateTime = function (date, mask, utc) {

        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len)
                    val = "0" + val;
                return val;
            };

        var dateFormat = {
            masks: {},
            i18n: {}
        };

        // Some common format strings
        dateFormat.masks = {
            "default": "ddd mmm dd yyyy HH:MM:ss",
            shortDate: "m/d/yy",
            mediumDate: "mmm d, yyyy",
            longDate: "mmmm d, yyyy",
            fullDate: "dddd, mmmm d, yyyy",
            shortTime: "h:MM TT",
            mediumTime: "h:MM:ss TT",
            longTime: "h:MM:ss TT Z",
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };

        // Internationalization strings
        dateFormat.i18n = {
            dayNames: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            monthNames: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ]
        };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length === 1 && Object.prototype.toString.call(date) === "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ?
                new Date(date) :
                new Date();
            if (isNaN(date))
                throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ?
                "getUTC" :
                "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ?
                    0 :
                    date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ?
                        Math.round(L / 10) :
                        L),
                    t: H < 12 ?
                        "a" :
                        "p",
                    tt: H < 12 ?
                        "am" :
                        "pm",
                    T: H < 12 ?
                        "A" :
                        "P",
                    TT: H < 12 ?
                        "AM" :
                        "PM",
                    Z: utc ?
                        "UTC" :
                        (String(date).match(timezone) || [""])
                            .pop()
                            .replace(timezoneClip, ""),
                    o: (o > 0 ?
                        "-" :
                        "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ?
                        0 :
                        (d % 100 - d % 10 != 10) * d % 10
                    ]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ?
                    flags[$0] :
                    $0.slice(1, $0.length - 1);
            });
        };
    }();

    /**
     * 格式化数字
     * @param  {int} number     待格式化的数字
     * @param  {} pattern       格式，如 0.00等
     * @return {String}         格式化后的字符串
     */
    rt.formatNumber = function (number, pattern) {

        var str = number.toString();
        var strInt;
        var strFloat;
        var formatInt;
        var formatFloat;
        if (/\./g.test(pattern)) {
            formatInt = pattern.split('.')[0];
            formatFloat = pattern.split('.')[1];
        } else {
            formatInt = pattern;
            formatFloat = null;
        }

        if (/\./g.test(str)) {
            if (formatFloat !== null) {
                var tempFloat = Math.round(parseFloat('0.' + str.split('.')[1]) * Math.pow(10, formatFloat.length)) / Math.pow(10, formatFloat.length);
                strInt = (Math.floor(number) + Math.floor(tempFloat)).toString();
                strFloat = /\./g.test(tempFloat.toString()) ?
                    tempFloat
                        .toString()
                        .split('.')[1] :
                    '0';
            } else {
                strInt = Math
                    .round(number)
                    .toString();
                strFloat = '0';
            }
        } else {
            strInt = str;
            strFloat = '0';
        }
        var zero;
        if (formatInt !== null) {
            var outputInt;
            outputInt = '';
            zero = formatInt.match(/0*$/)[0].length;
            var comma = null;
            if (/,/g.test(formatInt)) {
                comma = formatInt.match(/,[^,]*/)[0].length - 1;
            }
            var newReg = new RegExp('(\\d{' + comma + '})', 'g');

            if (strInt.length < zero) {
                outputInt = new Array(zero + 1).join('0') + strInt;
                outputInt = outputInt.substr(outputInt.length - zero, zero);
            } else {
                outputInt = strInt;
            }
            outputInt = outputInt.substr(0, outputInt.length % comma) + outputInt
                .substring(outputInt.length % comma)
                .replace(newReg, (comma !== null ?
                    ',' :
                    '') + ' JavaScript Content ');
            outputInt = outputInt.replace(/^,/, '');

            strInt = outputInt;
        }

        if (formatFloat !== null) {
            var outputFloat = '';
            zero = formatFloat.match(/^0*/)[0].length;
            if (strFloat.length < zero) {
                outputFloat = strFloat + new Array(zero + 1).join('0');
                //outputFloat        = outputFloat.substring(0,formatFloat.length);
                var outputFloat1 = outputFloat.substring(0, zero);
                var outputFloat2 = outputFloat.substring(zero, formatFloat.length);
                outputFloat = outputFloat1 + outputFloat2.replace(/0*$/, '');
            } else {
                outputFloat = strFloat.substring(0, formatFloat.length);
            }

            strFloat = outputFloat;
        } else {
            if (pattern !== '' || (pattern === '' && strFloat === '0')) {
                strFloat = '';
            }
        }

        return strInt + (strFloat === '' ?
            '' :
            '.' + strFloat);
    };

    /**
     * 根据传入的Url，获取返回值JSON  （同步）
     * @param  {String} serverUrl 服务器地址
     * @return {JSON}           返回的json数据
     */
    rt.getJSON = function (serverUrl) {
        var xmlhttp = this.getXHR();
        xmlhttp.open("get", serverUrl, false);
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xmlhttp.send();
        return xmlhttp.responseText;
    };

    /**
     * 获取月份的最后一天
     * @return {date} [description]
     */
    rt.getLastDayOfMonth = function () {

        var Nowdate = new Date();
        var MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1);
        return new Date(MonthNextFirstDay - 86400000);
    };

    /**
     * 根据传入的Url，获取返回值JSON,并生成对应的JS对象 （同步）
     * @param  {String} serverUrl 服务器地址
     * @return {object}           [description]
     */
    rt.getObject = function (serverUrl) {
        var json = this.getJSON(serverUrl);
        try {
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    };

    /**
     * 根据传入的Url，获取返回值原始文本  （同步）
     * @param  {String} serverUrl 服务器URL地址
     * @return {[type]}           [description]
     */
    rt.getResponse = function (serverUrl) {
        var xmlhttp = rt.getXHR();
        xmlhttp.open("get", serverUrl, false);
        xmlhttp.send();

        return xmlhttp.responseText;
    };

        /**
     * 根据传入的Url，下载文件  （同步）
     * @param  {String} serverUrl 服务器URL地址
     * @return {[type]}           [description]
     */
    rt.downLoadFile = function (serverUrl,type) {
        var xmlhttp = rt.getXHR();
        xmlhttp.open(type, serverUrl, false);
        xmlhttp.send();

        return xmlhttp.responseText;
    };

    /**
     * 获取屏幕高度
     * @return {[type]}               [description]
     */
    rt.getScreenHeight = function () {
        return document.documentElement.clientHeight || document.body.clientHeight;
    };

    /**
     * 获取屏幕宽度
     * @return {[type]} [description]
     */
    rt.getScreenWidth = function () {
        return document.documentElement.clientWidth || document.body.clientWidth;
    };

    /**
     * 获取URL中传递过来的参数值
     * @param  {string} name 参数的名称
     * @return {string}      参数的值
     */
    rt.getUrlParam = function (name) {

        try {
            var query = location
                .search
                .substring(1);
            var pairs = query.split("&");
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos == -1)
                    continue;
                var argname = pairs[i].substring(0, pos);
                if (argname == name)
                    return pairs[i].substring(pos + 1);
            }
        } catch (e) {
            alert(e);
        }
        return '';
    };

    /**
     * 获取XHR对象
     * @return {[type]} [description]
     */
    rt.getXHR = function () {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
        }
        return null;
    };

    /**
     * 判断js变量是否为boolean类型
     * @param  {object}  obj 要判断的Js对象
     * @return {Boolean}
     */
    rt.isBoolean = function (obj) {
        return typeof obj === "boolean";
    };

    /**
     * 判断字符是否有效的手机号码
     * @returns {boolean}
     */
    rt.isCellphone = function (str) {
        var regex = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        return regex.test(str);
    };

    /**
     * 判断是否是日期类型
     * @param d
     * @returns {boolean}
     */
    rt.isDate = function (d) {
        if (rt.isNull(d)) {
            return false;
        }

        return d instanceof Date && !isNaN(d.valueOf());
    };

    /**
     * 检查是否是邮件地址
     */
    rt.isEmailAddress = function (str) {
        var regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

        return regex.test(str);
    };

    /**
     * 判断变量f是否是一个函数
     * @param f 变量f
     * @returns {boolean} 如果是函数则返回true，否则返回false
     */
    rt.isFunction = function (f) {
        if (rt.isNull(f)) {
            return false;
        }

        return typeof f === 'function';
    };

    /**
     * 判断字符是否有效的身份证号码
     * @returns {boolean}
     */
    rt.isIDCard = function (str) {
        var regex = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        return regex.test(str);
    };

    /**
     * 检查是否为整数
     * @param  {string}  str 数字
     * @return {Boolean}            若为整数，返回TRUE；否则，返回false
     */
    rt.isInteger = function (str) {
        var regex = /^[-]{0,1}[0-9]{1,}$/;
        return regex.test(str);
    };

    /**
     * 判断一个变量是否是undefined或者null
     * @param o 需要进行判断的变量
     * @returns {boolean} 如果是undified或者null，则返回true，否则返回 false
     */
    rt.isNull = function (o) {
        return o === undefined || o === null;
    };

    /**
     * 判断一个字符串是否是undified、null、“”
     * @param s 字符串变量
     * @returns {boolean} 如果是，则返回true，否则返回false
     */
    rt.isNullOrWhiteSpace = function (s) {
        return this.isNull(s) || s.trim() === "";
    };

    /**
     * 检查是否为数字（实数）
     * @param  {string}  str 待检查的数字
     * @return {Boolean}           若为数字，返回true；否则返回false
     */
    rt.isNumeric = function (str) {

        var regex = /^(-|\+)?\d+(\.\d+)?$/;

        return regex.test(str);
    };

    /**
     * 检查是否是手机号码或者电话号码
     */
    rt.isPhone = function (str) {
        return this.isCellphone(str) || this.isTelephone(str);
    };

    /**
     * 不区分大小写、{}，比较两个guid
     * @param  {String}  guid1 参与比较的第一个Guid
     * @param  {String}  guid2 参与比较的第二个Guid
     * @return {Boolean}
     */
    rt.isSameGuid = function (guid1, guid2) {

        var isEqual;
        if (guid1 === null || guid2 === null) {
            isEqual = false;
        } else {
            isEqual = guid1
                .replace(/[{}]/g, "")
                .toLowerCase() === guid2
                    .replace(/[{}]/g, "")
                    .toLowerCase();
        }

        return isEqual;
    };

    /**
     * 判断js变量是否为string类型
     * @param  {object}  obj 要判断的Js对象
     * @return {Boolean}
     */
    rt.isString = function (obj) {
        return typeof obj === "string";
    };

    /**
     * 判断字符是否有效的电话号码
     * @returns {boolean}
     */
    rt.isTelephone = function (str) {
        var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
        return reg.test(str);
    };

    /**
     * 检查是否为正整数
     * @param  {string}  str 数字字符串
     * @return {Boolean}            若为正整数，返回TRUE；否则，返回false
     */
    rt.isUnsignedInteger = function (str) {
        var regex = /^[1]{0,1}[0-9]{1,}$/;

        return regex.test(str);
    };

    /**
     * 检查是否为正数
     * @param  {string}  str 数字
     * @return {Boolean}           若为正数，返回TRUE；否则返回false
     */
    rt.isUnsignedNumeric = function (str) {
        var regex = /^\d+(\.\d+)?$/;

        return regex.test(str);
    };

    rt.isUrl = function (str) {
        return !this.isNullOrWhiteSpace(str) && (str.startWith("http://") || str.startWith("https://"));
    }

    /**
     * 使用jsonp处理跨域请求
     * @param  {string}   url      请求的地址
     * @param  {Function} callback 回调方法
     * @return {object}            返回的对象
     */
    rt.jsonp = function (url, callback) {
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function (data) {
            delete window[callbackName];
            document
                .body
                .removeChild(script);
            callback(data);
        };

        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ?
            '&' :
            '?') + 'callback=' + callbackName;
        document
            .body
            .appendChild(script);
    }

    /**
     * 生成一个新的GUID
     * @returns {string} GUID
     */
    rt.newGuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    /**
     * 定义一个空方法
     * @return {[type]} [description]
     */
    rt.noop = function () { };

    /**
     * 同步POST执行后台方法
     * @param  {String} url URL地址
     * @param  {String} data   传递参数
     * @return {[type]}           [description]
     */
    rt.postResponse = function (url, data) {
        var xmlhttp = this.getXHR();
        xmlhttp.open("post", url, false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);

        return xmlhttp.responseText;
    };



    /*
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     */

    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
    var hexcase = 0;
    /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad = "";
    /* base-64 pad character. "=" for strict RFC compliance   */
    var chrsz = 8;
    /* bits per input character. 8 - ASCII; 16 - Unicode      */

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    rt.md5 = function (s) {
        return hex_md5(s);
    };

    rt.hmacmd5 = function (s) {
        return hex_hmac_md5();
    };

    function hex_md5(s) {
        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    };

    function b64_md5(s) {
        return binl2b64(core_md5(str2binl(s), s.length * chrsz));
    }

    function str_md5(s) {
        return binl2str(core_md5(str2binl(s), s.length * chrsz));
    }

    function hex_hmac_md5(key, data) {
        return binl2hex(core_hmac_md5(key, data));
    }

    function b64_hmac_md5(key, data) {
        return binl2b64(core_hmac_md5(key, data));
    }

    function str_hmac_md5(key, data) {
        return binl2str(core_hmac_md5(key, data));
    }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    function md5_vm_test() {
        return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length
     */
    function core_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);

    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }

    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data
     */
    function core_hmac_md5(key, data) {
        var bkey = str2binl(key);
        if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

        var ipad = Array(16),
            opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
        return core_md5(opad.concat(hash), 512 + 128);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
     * Convert a string to an array of little-endian words
     * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
     */
    function str2binl(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        return bin;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2str(bin) {
        var str = "";
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
        return str;
    }

    /*
     * Convert an array of little-endian words to a hex string.
     */
    function binl2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }

    /*
     * Convert an array of little-endian words to a base-64 string
     */
    function binl2b64(binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i += 3) {
            var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
            }
        }
        return str;
    }
});
