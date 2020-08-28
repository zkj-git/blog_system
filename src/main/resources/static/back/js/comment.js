var mditor;
var tale = new $.tale();
var attach_url = $('#attach_url').val();
// 每10分钟自动保存一次草稿
// var refreshIntervalId = setInterval("autoSave()", 10 * 60 * 1000);
Dropzone.autoDiscover = false;

$(document).ready(function () {

    mditor = window.mditor = Mditor.fromTextarea(document.getElementById('md-editor'));

    // Tags Input
    $('#tags').tagsInput({
        width: '100%',
        height: '35px',
        defaultText: '请输入文章标签'
    });

    $('.toggle').toggles({
        on: true,
        text: {
            on: '开启',
            off: '关闭'
        }
    });

    $("#multiple-sel").select2({
        width: '100%'
    });

    $('div.allow-false').toggles({
        off: true,
        text: {
            on: '开启',
            off: '关闭'
        }
    });

    if($('#thumb-toggle').attr('thumb_url') != ''){
        $('#thumb-toggle').toggles({
            off: true,
            text: {
                on: '开启',
                off: '关闭'
            }
        });
        $('#thumb-toggle').attr('on', 'true');
        $('#dropzone').css('background-image', 'url('+ $('#thumb-container').attr('thumb_url') +')');
        $('#dropzone').css('background-size', 'cover');
        $('#dropzone-container').show();
    } else {
        $('#thumb-toggle').toggles({
            off: true,
            text: {
                on: '开启',
                off: '关闭'
            }
        });
        $('#thumb-toggle').attr('on', 'false');
        $('#dropzone-container').hide();
    }

    var thumbdropzone = $('.dropzone');
});

/**
 * 保存评论
 * @param status
 */
function subComment(status) {

    var content =  mditor.value;

    if (content == '') {
        tale.alertWarn('请输入文章内容');
        return;
    }
    $('#content-editor').val(content);
    $("#articleForm #status").val(status);
    //$("#articleForm #categories").val($('#multiple-sel').val());
    var params = $("#articleForm").serialize();
    var url = $('#articleForm #id').val() != '' ? '/admin/comment/modify' : '/admin/article/publish';
    tale.post({
        url:url,
        data:params,
        success: function (result) {
            if (result && result.success) {
                tale.alertOk({
                    text:'评论保存成功',
                    then: function () {
                        setTimeout(function () {
                            window.location.href = '/admin/comment';
                        }, 500);
                    }
                });
            } else {
                tale.alertError(result.msg || '保存评论失败！');
            }
        }
    });
}

function allow_comment(obj) {
    var this_ = $(obj);
    var on = this_.find('.toggle-on.active').length;
    var off = this_.find('.toggle-off.active').length;
    if (on == 1) {
        $('#allow_comment').val(false);
    }
    if (off == 1) {
        $('#allow_comment').val(true);
    }
}
