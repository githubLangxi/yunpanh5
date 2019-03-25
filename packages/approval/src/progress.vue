<template>
  <div>
    <div id="approveState">
      <div v-for="(state,index) in stateList" :key="state.Status" class="nodelist">
        <div class="node">
          <i class="node-icon" v-bind:class="{'icon-approving':(state.Status !== 2 && state.Status !== 0),'icon-approved':state.Status === 2,'icon-submit':state.Status === 0}"></i>
          <ul>
            <li class="owner">{{state['OwneridName']}}</li>
            <li class="date">{{state['ApproveDate']}}</li>
          </ul>
        </div>
        <div v-if="index !== stateList.length - 1" class="proce">
          <span>- - - - - - - </span>
        </div>
      </div>

    </div>
    <br />
    <h3>{{$t('History')}}</h3>
    <div id="approveTrack">
      <ul>
        <li v-for="(track,index) in trackList" v-bind:class="{last: index === trackList.length - 1}" :key="track.Date">
          <div style="margin-top:-7px;">
            <i class="node-icon" v-bind:class="{first: index === 0}"></i>
            <div>
              <span class="date">{{track['Date']}}</span>
              <span class="action">[{{track['ActionType']}}]</span>
              <span class="step">{{track['StepIdName']}}</span>
              <span class="owner">{{track['OwneridName']}}</span>
            </div>
            <div class="memo">
              <span>{{track.Memo}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RtApprovalProgress',
  data() {
    return {
      stateList: [],
      trackList: []
    }
  },
  props: {
    entityName: {
      type: String,
      require: true
    },
    entityId: {
      type: String,
      require: true
    }
  },
  watch: {
    entityId(val) {
      if (val) {
        this.getStateList(val);
        this.getTrackList(val);
      }
    }
  },
  mounted: function() {
    if (!rt.isNullOrWhiteSpace(this.entityId)) {
      this.getStateList(this.entityId);
      this.getTrackList(this.entityId);
    }
  },
  methods: {
    getStateList(entityId) {
      rt.get("../api/CrmFlow/GetFlowApprovalStep/" + entityId)
        .then((res) => {
          if (res == null || res.length == 0) {
            return;
          }

          //把提交信息塞到数组里面
          var submit = {
            OwneridName: res[0]["ApplyUserName"] + " 提交",
            ApproveDate: res[0]["ApplyDate"],
            Status: 0
          };
          res.unshift(submit);

          this.stateList = res;
        }).catch((error) => {
          rt.showErrorToast(error);
        });
    },
    getTrackList(entityId) {
      rt.get("../api/CrmFlow/GetFlowApprovalTrack/" + entityId)
        .then((res) => {
          this.trackList = res;
        }).catch((error) => {
          rt.showErrorToast(error);
        });
    }
  }
}
</script>


<style scope>
a {
  text-decoration: none;
}

ul li {
  list-style: none;
}

#approveState {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 25px 35px;
  border-bottom: 1px solid #cccccc;
  display: -webkit-box;
  white-space: nowrap;
  font-size: 14px;
}

#approveState .nodelist {
  height: 100px;
  display: inline-block;
  display: -webkit-box;
}

#approveState .node {
  position: relative;
  top: 0;
  float: left;
  width: 50px;
  height: 50px;
}

#approveState .node .node-icon {
  position: absolute;
  display: block;
  left: 1px;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#approveState .icon-submit {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDQjg2MzM1NDc3NjExRTdBRUQ4QjVFQTJCNENCN0U1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDQjg2MzM2NDc3NjExRTdBRUQ4QjVFQTJCNENCN0U1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUNCODYzMzM0Nzc2MTFFN0FFRDhCNUVBMkI0Q0I3RTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUNCODYzMzQ0Nzc2MTFFN0FFRDhCNUVBMkI0Q0I3RTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/dl4rAAAFpElEQVR42tyae0zbVRTHv5QWeTMwQ4QUzBjjERTCYwoOkI0BiWy6ZtFNsInoeIQ/UISEaIAJf6AGFcKyhw6SwYhsBicTx5gZOKJMAXWAk0IhsFULAtvCo7gBDu+vXFiltPz6WGk9ycmv+T3uPZ/+7rn3nHN/ZtCTLP7wtQ85RBMNIbqNqBdRW6I29BYZ0RmiYqL9RDuJtpg9u0ekj/7NdDTelxyERBOJ8rVsRkK0hmgVgeo1KAgBCCeHfKJx0K80ES0kQG0PFYQAMP96GdF9eLhyjmgmAZLoHYRAvEEhrGEYmaUwJ/UCQgAYwz+lfrARwvhPCgGa1RqEQDiSQwPRcGysMD6TQGDuaAxCIVqJ+sM45DeikapgOGqGU4MRQYDa0kBtYwdCfSIcxifh1Lb1QejslAjjlURqo2ofoeuEiM0U2z46hcaOLkzJZBpZ4eK4CZm7QmHBNdd1avZRXGe4q25gtU40DY6i/MxXSE9Ph4uLC+ve+/r6UFpaCtHwTXwsfAEOVo9oC2JNbRUogdCwg9WKfeqbb1FQUIDQ0FCNLQgMDERAQABeK69GeeoBuDnYaguzj7F5OZxR9JF8ti1Mz8jg7e2t9bjIyMhAklCI5E8qcX3kli5DLP8/zk6jWI0CQDMznQJnCAQCFBw+jDePVeOKWKJtM3HU9pU3IjTEdMPhcLCwsPBgLg0PR/mRI/ig9jzOdvyubbNCRRCDTLeenp4YHh7G4ODgyjkfHx9UVFbii+87UHrpKhYXFzWejuXOTjM7viFA7O3tkZubi7S0NPj7+8PBwWHlmru7O043NGF2bh7vJERq0iyfYeDS9FRn6e/vx/T0tPoe+XzExsYiLCwMYrFY6d+PiIjA2drPtek+mktzbJ2lvr4eo6Oj6nuLjkZCQgLs7OwQFBSkdJ05r6WEcGmhQGfJycnZyLBlG4dWO0xdvDi0ZGPqYstRqDuZsthw9dVSdnY2pFKpRs+4urqipKREL/0zIDJ9vJW8vDzINAzpbWz0NhhkDMiMPkCYxU1xgTOwzDA+IjaWge7s7IwXE57X5lEx80aYgvKOjQTo6elBY2MjBgYGsLgwj4F2C8SHPImgrU+wDiwYEKYqnqyrMa2trZicnGQdBcfExMiPxcXFEPV2Q7jfDwdj3WDOWUTv9SkcPX8JTtYOKHxVAEsL3npNdjIgLfr4V5modnx8nNW9PB4PUVFR8rT3/twIqksCYG7+IL9xdXbCzue2o+z4IN49VYePDh1Yr8kWLrM/QaJHia4RsFCoWUojEolw7ddO1JYFrUAcr+lF+7VxVHwYCSZvy0zzRHLmT7jaO4Aw362qmpIwDMv5SI2h/aK5uRl743zB5S6Z0PidBBcuS3B78h7eP9oFJjBmYATxW9DcpXbbpEYxsaoyNMjY2Bj4jy9VUebm/kHTlT+RkuSDHcGP4e69BfQOLFVG3VwtMT6pNj2oWgGhO0VNbI2wsrLE0NCQTiCOjo74a2Je/tvCwhylBc/A1ponrwW8lxUMPy9H+bWJiTlsslFZoWpa3uVSDFEK2RYg9u+KQlFREbKysuDh4aFdAhESghPHyvBy/FNQV8douHwTe0O2q7pcuFIMUTxLnP5LtrWtC2IpGn/8Gbdu39EKJD5mJ37p6oavJw+pBzevec+ZOikutkhR8dbr4CjTniNvQ6AKhHXJVC9xxd938fbJWpIZciB8aQv8/WzkFvX3z6Km7gZu/DGD0tRX4GSnlGkolUyVMGmB+DNDOf19Mj1d7CQre2c3BkfGlgoRmx9FbLA/9jwdCJ75mjXiQ6u35NYcnQTmNIy3Il9DIJKUogUVN6dgabvL2KSN2qYk/++tN7q2MA9EGsmbaVMHoRZEAWb3RoQwq0KQ3eog1A4tFbOZ6X4wsMY6Y9qfcKwCMu2PatYAMu3PnFRAbeiHZ/8KMACuoelvt7NT4QAAAABJRU5ErkJggg==");
}

#approveState .icon-approving {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCMjU5RjUxNDc3NjExRTc5QTZDREJFRkJGOTE1QTIyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCMjU5RjUyNDc3NjExRTc5QTZDREJFRkJGOTE1QTIyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUIyNTlGNEY0Nzc2MTFFNzlBNkNEQkVGQkY5MTVBMjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUIyNTlGNTA0Nzc2MTFFNzlBNkNEQkVGQkY5MTVBMjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7GYd0WAAADDklEQVR42tyav4saURDHxzUqxkMIiMHCNHLnXUhpZeDgiiNNmtQGq3Ct/4GF/4FtSCWxtrGxEgKxsgy5U7HJFiYiBCQqKmpm9uaFjbe7t+t5us8vDLvI87357LzZ92s9sCU1m81TvFygpdBO0I7RjtBCXGSE9getg9amv6DVU6nUzTba9zzQ+TO8ZNEyaPENq1HRymglhLreKQgCpPGSR3sD21UNrYBAjUcFQQB66kW0d/C4qqDlEEjdOghCfGCIp7AbjRnm01ZAEIAc/8h5sA9R/lwh0HhjEIR4hpcqWhr2K8qZtwjz2zEIQ3xBewXu0De0czMYxaI7VV0EAexLlX2zB8I5kQb3Kc2+3Q/Cb6cMuFcZ9tE8R3icuNnhK/Yhr+ZT/TizHpGiBBDAPhYNI8LTjq8gl16L6Yw+InmQT/n/IsKz2O8gp17SrFlEJAvyKqvvWhmJQTTfPbyyuwa5dabw8lR2XSi8xpZdKYU3CmTXicK7HfbXxh4PBAIBUBTFVnmfz6eZHVGdVDe14VDHT3jLxpa8Xi8kk0kIBoOwXC6h2+3CcDg0LR+PxyEajWr3/X4fVNV8CR4OhyGRSGgwk8kEWq0WLBYLu64d0WMN2S0diUQ0CPH0YrGYZSQEBInurSJDdYkoUxvUlgOFFDgQEcjIbuHBYKCFnURdq9frmZadz+dadxKie/rNTFQX1UmiNqgtBxrRgPgTb547SXa/3685JRq+L9kFmJ1kp/Kz2QxWq5UTkF+U7B0nINTAdDq13YIdACF6ME7q1qlDXat9ACnSJpDmAYA0CaR+ACB1sbD6AZsfC+xbKi6sXohxpCxxNMr6hVVJYpDSPxA+KapJCFETp1z6KUpBQpCCfooCHBXaH6pIBFHRH9GtTxpzcLsd6XaN2VcwBOG91JwEIHfOFw2XYjiufAb3bhGVEeK90TTeSFdwe9zlNjXYt7uzctPJyyEcvXG+0B/OXRKZhhWEJYgO5nLPUxhq+9IKwrJrGXQ1uT8YWIOR/xOONSC5P6oxAJL7MycTqL1+ePZXgAEAuOQVwoZEwccAAAAASUVORK5CYII=");
}

#approveState .icon-approved {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDMzQ5RTBBNDc3NjExRTc5NUVGRTM1MDRDMUNBRjQ5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDMzQ5RTBCNDc3NjExRTc5NUVGRTM1MDRDMUNBRjQ5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUMzNDlFMDg0Nzc2MTFFNzk1RUZFMzUwNEMxQ0FGNDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUMzNDlFMDk0Nzc2MTFFNzk1RUZFMzUwNEMxQ0FGNDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6g5m9DAAAHVklEQVR42txaaUxURxz/8VgQOaq4CF4cRjll/WBQBBKCosUgxApirBCoFU0aqX4wWOvBWRDBD20stSloCdFWK7JErIoSRUSqstYDBCOoVRMiRLFcAgJLZ4YHWTl234OHYn/JP2+PmXnzm/lf839PDxLh2rNMJ3JZQsSNiAMReyKmREz4Jq1EWohUE3lIREXkspdN5AMp7q83ysk7k0s4kVAi1iMc5jmRY0SyCamq90qEEPAklxgifpAWBUQSCKHSMSVCCNBV/4HIaowtlES2EULPJSdCSETyJIzxfvCGJ5MpCRFCgE78F94OPgSo/WwmhN6MmAghYU4uZ4h44sOC2kwAIfNaNBGeRDERV4wPVBDxHo4Mp0WdzowjEuDncoafmzAivE14YvzBk5+bbtXivVPGaO7W/OotasrrUfv0Fd60dLDfJpoYYqadBeYopuIT+YTREto00JvpDREnHozExba1dKEotwp5JwpRUX5fa1vF/HkIDFkK3zXzYGQiG6lrdtKMMwOJ5IoNdupuEo6PleNgWhYaGxsxd+5cBAUFwdvbG05OTpDL5azdy5cvUVlZieLiYuTm5uLJkyeYPHkyvt4RgU8/dwWnLzrJUBIiQYOI8GnHNTEjNb3qRPyWX3G99CYWLFiApKQk+Pn5QU9P+6TUajXy8/OxZ88eVFRUwMPLHTE/ho9E5bz60hlNY48RM8LL5+2IDPwOqpt/IzU1FWVlZVixYoVOEuymHIdVq1bh9u3bSEhIwI2/ypCfeQ9Gsk/EEol5Z0f4LLZSuDF3YWNgIhr/bYRSqcSyZctGZbk1NTVMJdu7mlBel49OdTv7/Z/qWpSVVCFkg6+27i40a+7bkXAxNhG35Qjq6+olIUFBSVDQHbGX+7D1vfSniixWEr6P/R1FZ29p6x6uqVqC86iC3+4zm9i3b58kJAbCVGaFwykXsfern9H+pgOOrrZwnG+rrQubux5/shN0oGlvUSPIIxoODg64fv0603UpUVdXh3Xr1qGoqIh99w/xQnRyGAwnGOjq6izjj6eCUKSsYi6WGqjUJOjCBAcHo7a2FoaGhti7byuWhjgJ7b6E48/YgpB3/ALs7e2ZdxqIzMxMXLhwYUQk0tPTWdyhJGbNmsVizbaoaDFDuHF8oUAnWhvUKCcRe82aNYP+y8rKwqZNmxASEoKqKuHH7ra2NkRERCAqKgqdnZ3w8fHBrVu34O7uDjPDqZBxguOKA8dXO3S7SJI7UdCVGwh/f3/Y2dmhqakJK1euZFFcFx4/fgwPDw9kZ2ez79u3b0dhYSEsLS37I4O6zUgoEXuOL9noRO3T3sk5OzsP+o/e/OzZs5g0aRJLPVavXo23b98OOxZt6+bmhrt378LU1BQnT57EgQMHoK+v37v7ra1sQZRHLwl2dpxG3Um7arX0Bilzc/Oh3QYheOrUKRgYGKCkpISp2lCpSXx8PAICAvD69Ws4Ojrixo0bg9S1ubmZkW1v6xRKxERS1+Pr64tDhw6xz1RlaKzpA514YGAg4uLi0NPTwxJLmta4uLgMGofaC1MuEXkkx1cAdVM27dXXhoYGre02btyInTt3ss+7du1imS5VIapKdJWp205JSUFOTg7MzMyGHKPvHiZmE4XyaJXxZUyd6jXD1oJdqVeihq0NycnJePToEdP9sLCwfg9lYWGB48ePs53Thj7PN83GXCiRFo6vxerOhxS93qQv6motzRCdoC550aJFjACVhQsXMteqiwTFlStX3rmnAFRTIg8FqdYUDgqFKzNoquO6YGxsjNOnT8PW1haRkZG4evUqbGxsdPbr7u5myairwgWT5ILd70NKRCW09WfrljOVKSgoENTeysoKd+7cQUZGBiZMEBbcqDrSnCtw7VIxfkY1oqRx9uzZUKlU/X5fKnR0dJBdV6C+vh45pSkwNjMQ2tWZ459PCCoWG5Gws3XHl2yV09LSJE/hY2NjUV1djS3R4WJIPKccOI36qiD4rXfFYk93dt4+f/68ZCSoSu3fvx/ui92wYv18sbXh/oNVttBeevo9iEvfgGnTp7Ggdu7cuVGToDElNDQUM2bOQEz6F9CXiaqoZPcT4Z8UFQjtaSaX4acT32KKfApLNxITE9HV1SWaAM3Hdu/ejbVr18LSyhLpf3yDyVONxAxR0PeUSzNFSRAzgoW1EQ7n78WixQsRExPDykF5eXksnxLiYmlgpIZNgydVp4zTu2BpbSJ2LRKkLdCRc/zB1CPs9Ghtbd1foKNJIY3mNO7Q1J5GbBrsaCx68eIFy5ajoiOITSjAySQq0I22ZEpd82VlJTlFXhRQMnVlJdOlwS6YaDoGJVOpitgtDV2ouVeP2mev0NpM0/8elnROt5VjjsJi7IvYGmSO4sM9atPpbgmJsKHS+KGwGb2Pu8YbSvm5DQ4Lw/X4Xzx642ML7eA9TnamVBsJrUQ0yCwXk8KMhU3QOWgjoVW1hvFmH+8LA0PEmY/7FY4BhD7ul2qGIPRxv+Y0DKkP+uLZfwIMAHeP5nlvq2XCAAAAAElFTkSuQmCC");
}


#approveState .proce {
  position: relative;
  float: left;
  top: 16px;
  margin: 0 20px;
  color: #888888;
}

#approveState .node ul {
  z-index: 1;
  width: 189px;
  margin-left: -64px;
  top: 55px;
  position: absolute;
  text-align: center;
}

#approveState .owner {
  font-size: 14px;
  color: #444444;
  margin-top: 5px;
}

#approveState .date {
  font-size: 14px;
  color: #444444;
  margin-top: 3px;
}

#approveTrack {
  margin-top: 20px;
  overflow-y: auto;
  height: 280px;
  font-size: 14px;
}

#approveTrack ul {
  margin-top: 15px;
  margin-left: 15px;
}

#approveTrack ul li {
  position: relative;
  padding: 0 15px 20px 15px;
  border-left: 1px solid #d9d9d9;
  color: #333;
}

#approveTrack ul li.last {
  border-left-color: #ffffff;
}

#approveTrack ul li .node-icon {
  position: absolute;
  left: -8px;
  width: 15px;
  height: 15px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAAZ0lEQVR42mNgoCb48/v3/z/vP/z/8+wJAoP4QHHCGpE1oWNcBhDUiM8AZKf+vHDx/6v0rP/P3L3ANIiP7AVMzUimgzQ8trCGYxAfWR6vZpCNyJpBfKI1k24zRX6mJLQpimeKUxhdAQCutIJ1GkzzcQAAAABJRU5ErkJggg==') 0 0 #fff no-repeat;
  top: 0;
}

#approveTrack .node-icon.first {
  padding-top: 0;
}

#approveTrack .date {
  display: inline-block;
  width: 130px;
}

#approveTrack .memo {
  color: #888888;
  word-break: break-all;
  padding-top: 5px;
  padding-left: 134px;
}
</style>