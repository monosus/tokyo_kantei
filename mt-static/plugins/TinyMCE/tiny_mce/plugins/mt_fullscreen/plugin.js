/*
 * Movable Type (r) (C) 2001-2019 Six Apart, Ltd. All Rights Reserved.
 * This code cannot be redistributed without permission from www.sixapart.com.
 * For more information, consult your Movable Type license.
 *
 * $Id$
 */
;(function($) {
    var enabled = false;
    var fitToWindow = function(){};
    var editorSize = null;
    var last_updated = null;

    tinymce
        .ScriptLoader
        .add(tinymce.PluginManager.urls['mt_fullscreen'] + '/langs/plugin.js');

    tinymce.create('tinymce.plugins.MTFullScreenPlugin', {
        init : function(ed, url) {
            var plugin = this;
            plugin.buttonIDs = {};

            tinymce.DOM.loadCSS(url + '/css/mt_fullscreen.css');

            var $window, $container, $parent, $header, $tabs, affectedEditors;

            function forEachAffectedEditors(func) {
                $.each(affectedEditors, function(i, id) {
                    if (tinyMCE.editors[id]) {
                        func.apply(tinyMCE.editors[id], []);
                    }
                });
            }

            ed.addCommand('mtFullScreenUpdateFitToWindow', function() {
                if (! enabled) {
                    return;
                }
                var now = new Date();
                if (last_updated && now - last_updated < 150 ) {
                    return;
                }
                last_updated = now;

                var header_height = $header.height();

                fitToWindow = function() {
                    var $outer = $parent.find('table:visible');
                    var $inner = $parent.find('.mceIframeContainer:visible');

                    var offset_height =
                        $outer.height() - $inner.height() + header_height;

                    forEachAffectedEditors(function() {
                        this.theme.resizeTo(
                            '100%',
                            $window.height() - offset_height,
                            false,
                            true
                        );
                    });
                };
            });
            ed.addCommand('mtFullScreenFitToWindow', function() {
                if (fitToWindow) {
                    fitToWindow();
                }
            });

            ed.addQueryValueHandler('mtFullScreenIsEnabled', function() {
                // Return the string object.
                // The IE makes an error when returning the boolean.
                return enabled ? 'enabled' : '';
            });

            ed.addCommand('mtFullScreen', function() {
                // ed.execCommand('mceFullScreen');
                if (! enabled) {
                    editorSize = ed.queryCommandValue('mtGetEditorSize');

                    $parent
                        .addClass('fullscreen_editor')
                        .css({
                            width: '100%',
                            margin: '0',
                            padding: '0'
                        });
                    $('body').addClass('fullscreen_editor_screen');

                    forEachAffectedEditors(function() {
                        $(ed.getContainer()).find('.mce-resizehandle').hide();
                    });


                    enabled = true;
                    ed.execCommand('mtFullScreenUpdateFitToWindow');
                    fitToWindow();
                    $window.bind('resize.mt_fullscreen', fitToWindow);
                }
                else {
                    ed.execCommand('mtRestoreEditorSize', editorSize);

                    $parent
                        .removeClass('fullscreen_editor')
                        .css({
                            width: '',
                            margin: '',
                            padding: ''
                        });
                    $('body').removeClass('fullscreen_editor_screen');

                    forEachAffectedEditors(function() {
                        $(ed.getContainer()).find('.mce-resizehandle').show();
                    });


                    enabled = false;
                    fitToWindow = function(){};
                    $window.unbind('resize.mt_fullscreen');
                }
                ed.fire('mtFullscreenStateChanged', {state: enabled});

                forEachAffectedEditors(function() {
                    this.nodeChanged();
                });
            });

            ed.addMTButton('mt_fullscreen', {
                icon: 'fullscreen',
                tooltip: 'mt_fullscreen',
                cmd: 'mtFullScreen',
                onPostRender: function () {
                  var self = this;
                  ed.on('mtFullscreenStateChanged', function (e) {
                    self.active(e.state);
                  });
                }
            });

            ed.on('init', function(args) {
                $window     = $(window);
                $container  = $(ed.getContainer());
                $parent     = $container.closest('#text-field');
                $header     = $parent.find('.editor-header');
                $tabs       = $header.find('.tab');
                if ($header.length == 0 || $tabs.length == 0) {
                    $parent = $container.closest('.editor-content');
                }
                fitToWindow = function(){};

                affectedEditors = $parent
                    .find('textarea')
                    .map(function() { return this.id });
            });
        },

        getInfo : function() {
            return {
                longname : 'MTFullscreen',
                author : 'Six Apart, Ltd',
                authorurl : '',
                infourl : '',
                version : '1.0'
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('mt_fullscreen', tinymce.plugins.MTFullScreenPlugin, ['mt']);
})(jQuery);
