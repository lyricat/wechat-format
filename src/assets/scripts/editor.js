

/** ===================== 粘贴图片上传相关 =================== */

var uploadService = 'https://stu.kenniu.top/testbaby_upload/fileupload' // 上传服务地址
var uploadFileFormDataKeyName = 'upfile'


/**
 * 从服务端响应的数据里提取出图片的url
 * @param {object} resData 服务端响应数据
 */
function decodeResImageUrl(resData){
  var rawUrl = resData.url;
  
  if( !rawUrl && resData.data ){
    rawUrl = resData.data.uri;
  }

  var prefix = rawUrl.indexOf('http')===0?'':'https://stu.kenniu.top';

  return prefix + rawUrl;
}

function handleClipboardData(items, cm){
  var flag = false;
  for(var i=0,len=items.length; i<len; i++){
    var citem = items[i];
    if( citem.type.indexOf('image')===0){
      flag = true;
      uploadimg(citem.getAsFile()).then(function(res){
        renderImgMD(res, cm);
      });
    }
  }

  return flag;
}

function renderImgMD(res, cm){
  var pos = cm.getCursor();
  var url = decodeResImageUrl(res.data);
  if( url ){
    cm.doc.replaceRange('![]('+url+')', pos);
  }else{
    app.$message({
      message: '上传失败', type: 'error'
    });
  }
}

function uploadimg(b){
  var f = new FormData();
  // f.append('upfile', b);
  f.append( uploadFileFormDataKeyName, b);

  return axios({
    method: 'post',
    url: uploadService,
    data:f,
    withCredentials: false
  })
}


// 图片上传
CodeMirror.defineInitHook(function(cm){
  cm.display.wrapper.addEventListener('paste', function(e){

    var clipboardData = (e.clipboardData || e.originalEvent.clipboardData);
    
    if( clipboardData.items ){
      if( handleClipboardData(clipboardData.items, cm) ){
        e.preventDefault();
      }
    }
  })
})

/** ===================== 粘贴图片上传结束 =================== */


var app = new Vue({
  el: '#app',
  data: function () {
    return {
      title: 'WeChat Format',
      aboutOutput: '',
      output: '',
      source: '',
      editorThemes: [
        { label: 'base16-light', value: 'base16-light' },
        { label: 'duotone-light', value: 'duotone-light' },
        { label: 'monokai', value: 'monokai' }
      ],
      currentEditorTheme: 'base16-light',
      editor: null,
      builtinFonts: [
        { label: '衬线', value: "Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"},
        { label: '无衬线', value: "Roboto, Oxygen, Ubuntu, Cantarell, PingFangSC-light, PingFangTC-light, 'Open Sans', 'Helvetica Neue', sans-serif"}
      ],
      currentFont: "Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
      currentSize: '16px',
      sizeOption: [
        { label: '16px', value: '16px', desc: '默认' },
        { label: '17px', value: '17px', desc: '正常' },
        { label: '18px', value: '18px', desc: '稍大' }
      ],
      currentTheme: 'default',
      themeOption: [
        { label: 'default', value: 'default', author: 'Lyric'},
        { label: 'lupeng', value: 'lupeng', author: '鲁鹏'}
      ],
      styleThemes: {
        default: defaultTheme,
        lupeng: lupengTheme
      },
      aboutDialogVisible: false
    }
  },
  mounted () {
    var self = this
    this.editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      lineNumbers: false,
      lineWrapping: true,
      styleActiveLine: true,
      theme: this.currentEditorTheme,
      mode: 'text/x-markdown',
    });
    this.editor.on("change", function(cm, change) {
      self.refresh()
    })
    // this.currentFont = this.builtinFonts[0],
    this.wxRenderer = new WxRenderer({
      theme: this.styleThemes.default,
      fonts: this.currentFont,
      size: this.currentSize
    })
    axios({
      method: 'get',
      url: './assets/default-content.md',
    }).then(function (resp) {
      self.editor.setValue(resp.data)
    })
  },
  methods: {
    renderWeChat: function (source) {
      var output = marked(source, { renderer: this.wxRenderer.getRenderer() })
      if (this.wxRenderer.hasFootnotes()) {
        output += this.wxRenderer.buildFootnotes()
      }
      return output
    },
    editorThemeChanged: function (editorTheme) {
      this.editor.setOption('theme', editorTheme)
    },
    fontChanged: function (fonts) {
      this.wxRenderer.setOptions({
        fonts: fonts
      })
      this.refresh()
    },
    sizeChanged: function(size){
      this.wxRenderer.setOptions({
        size: size
      })
      this.refresh()
    },
    themeChanged: function(themeName){
      var themeName = themeName;
      var themeObject = this.styleThemes[themeName];
      this.wxRenderer.setOptions({
        theme: themeObject
      })
      this.refresh()
    },
    refresh: function () {
      this.output = this.renderWeChat(this.editor.getValue())
    },
    copy: function () {
      var clipboardDiv = document.getElementById('output')
      clipboardDiv.focus();
      window.getSelection().removeAllRanges();  
      var range = document.createRange(); 
      range.setStartBefore(clipboardDiv.firstChild);
      range.setEndAfter(clipboardDiv.lastChild);
      window.getSelection().addRange(range);  

      try {
        if (document.execCommand('copy')) {
          this.$message({
            message: '已复制到剪贴板', type: 'success'
          })
        } else {
          this.$message({
            message: '未能复制到剪贴板，请全选后右键复制', type: 'warning'
          })
        }
      } catch (err) {
        this.$message({
          message: '未能复制到剪贴板，请全选后右键复制', type: 'warning'
        })
      }
    }
  }
})

