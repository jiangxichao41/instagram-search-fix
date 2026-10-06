// ==UserScript==
// @name         Instagram 搜索强制修复 V4
// @namespace    https://instagram.com/
// @version      4.0.0
// @description  强制修复 Instagram 网页版搜索按钮无反应
// @match        https://www.instagram.com/*
// @match        https://instagram.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const SEARCH_PAGE =
        'https://www.instagram.com/explore/search/keyword/?q=';

    let panel = null;

    // =====================================================
    // 创建搜索窗口
    // =====================================================

    function openSearch() {

        if (panel) {
            const input = panel.querySelector('input');
            if (input) input.focus();
            return;
        }

        panel = document.createElement('div');

        panel.id = '__ig_search_fix__';

        panel.innerHTML = `
            <div class="igsf-box">

                <div class="igsf-title">
                    Instagram 搜索
                </div>

                <div class="igsf-row">

                    <input
                        class="igsf-input"
                        type="text"
                        placeholder="输入用户名、关键词..."
                        autocomplete="off"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                    >

                    <button class="igsf-go">
                        搜索
                    </button>

                </div>

                <button class="igsf-cancel">
                    取消
                </button>

            </div>
        `;

        document.body.appendChild(panel);

        const input =
            panel.querySelector('.igsf-input');

        const go =
            panel.querySelector('.igsf-go');

        const cancel =
            panel.querySelector('.igsf-cancel');

        function search() {

            const keyword =
                input.value.trim();

            if (!keyword) {
                input.focus();
                return;
            }

            window.location.href =
                SEARCH_PAGE +
                encodeURIComponent(keyword);
        }

        go.onclick = search;

        input.addEventListener(
            'keydown',
            function (e) {

                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    search();
                }

                if (e.key === 'Escape') {
                    closeSearch();
                }

            },
            true
        );

        cancel.onclick = closeSearch;

        panel.addEventListener(
            'click',
            function (e) {

                if (e.target === panel) {
                    closeSearch();
                }

            }
        );

        setTimeout(() => input.focus(), 50);
    }


    // =====================================================
    // 关闭搜索窗口
    // =====================================================

    function closeSearch() {

        if (!panel) return;

        panel.remove();

        panel = null;
    }


    // =====================================================
    // 判断元素是不是 Instagram 搜索按钮
    // =====================================================

    function isSearchButton(el) {

        if (!el || el === document.body) {
            return false;
        }

        // aria
        const aria =
            el.getAttribute('aria-label') || '';

        const title =
            el.getAttribute('title') || '';

        const dataTest =
            el.getAttribute('data-testid') || '';

        const role =
            el.getAttribute('role') || '';

        const text =
            (el.textContent || '')
                .trim()
                .toLowerCase();

        const a =
            aria.toLowerCase();

        const t =
            title.toLowerCase();

        const d =
            dataTest.toLowerCase();

        // 搜索关键词
        if (
            a.includes('search') ||
            a.includes('搜索') ||
            t.includes('search') ||
            t.includes('搜索') ||
            d.includes('search') ||
            text === 'search' ||
            text === '搜索'
        ) {
            return true;
        }

        // SVG / button / link
        if (
            el.tagName === 'BUTTON' ||
            el.tagName === 'A' ||
            role === 'button'
        ) {

            const html =
                (el.innerHTML || '')
                    .toLowerCase();

            if (
                html.includes('search') ||
                html.includes('搜索')
            ) {
                return true;
            }
        }

        return false;
    }


    // =====================================================
    // 强制捕获 Instagram 搜索按钮
    // =====================================================

    document.addEventListener(
        'click',
        function (e) {

            let el = e.target;

            for (
                let i = 0;
                i < 10 && el;
                i++
            ) {

                if (isSearchButton(el)) {

                    // 当前已经是搜索页面，不拦截
                    if (
                        location.pathname.includes(
                            '/explore/search'
                        )
                    ) {
                        return;
                    }

                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    openSearch();

                    return;
                }

                el = el.parentElement;
            }

        },
        true
    );


    // =====================================================
    // 快捷键
    // =====================================================

    document.addEventListener(
        'keydown',
        function (e) {

            const tag =
                document.activeElement?.tagName;

            if (
                e.key === '/' &&
                tag !== 'INPUT' &&
                tag !== 'TEXTAREA'
            ) {

                e.preventDefault();

                openSearch();
            }

            if (
                e.ctrlKey &&
                e.key.toLowerCase() === 'k'
            ) {

                e.preventDefault();

                openSearch();
            }

        },
        true
    );


    // =====================================================
    // 固定“搜索修复”按钮
    // 用来确认脚本到底有没有运行
    // =====================================================

    function createFixButton() {

        if (
            document.getElementById(
                '__ig_fix_button__'
            )
        ) {
            return;
        }

        const btn =
            document.createElement('button');

        btn.id =
            '__ig_fix_button__';

        btn.textContent =
            '🔍 搜索修复';

        btn.onclick = function (e) {

            e.preventDefault();
            e.stopPropagation();

            openSearch();
        };

        document.body.appendChild(btn);
    }


    // =====================================================
    // CSS
    // =====================================================

    function addCSS() {

        if (
            document.getElementById(
                '__ig_search_fix_css__'
            )
        ) {
            return;
        }

        const style =
            document.createElement('style');

        style.id =
            '__ig_search_fix_css__';

        style.textContent = `

            #__ig_fix_button__ {

                position: fixed !important;

                right: 20px !important;
                bottom: 80px !important;

                z-index: 2147483647 !important;

                height: 42px !important;

                padding:
                    0 16px !important;

                border:
                    0 !important;

                border-radius:
                    22px !important;

                background:
                    #0095f6 !important;

                color:
                    white !important;

                font-size:
                    14px !important;

                font-weight:
                    600 !important;

                cursor:
                    pointer !important;

                box-shadow:
                    0 3px 15px
                    rgba(0,0,0,.35) !important;
            }


            #__ig_search_fix__ {

                position:
                    fixed !important;

                inset:
                    0 !important;

                z-index:
                    2147483647 !important;

                display:
                    flex !important;

                align-items:
                    center !important;

                justify-content:
                    center !important;

                background:
                    rgba(0,0,0,.65) !important;
            }


            .igsf-box {

                width:
                    min(92vw,520px) !important;

                box-sizing:
                    border-box !important;

                padding:
                    22px !important;

                background:
                    white !important;

                color:
                    black !important;

                border-radius:
                    16px !important;

                box-shadow:
                    0 10px 50px
                    rgba(0,0,0,.5) !important;
            }


            .igsf-title {

                margin-bottom:
                    15px !important;

                font-size:
                    20px !important;

                font-weight:
                    700 !important;
            }


            .igsf-row {

                display:
                    flex !important;

                gap:
                    8px !important;
            }


            .igsf-input {

                flex:
                    1 !important;

                min-width:
                    0 !important;

                height:
                    46px !important;

                padding:
                    0 13px !important;

                box-sizing:
                    border-box !important;

                border:
                    1px solid #aaa !important;

                border-radius:
                    10px !important;

                outline:
                    none !important;

                background:
                    white !important;

                color:
                    black !important;

                font-size:
                    16px !important;
            }


            .igsf-input:focus {

                border-color:
                    #0095f6 !important;
            }


            .igsf-go {

                height:
                    46px !important;

                padding:
                    0 18px !important;

                border:
                    0 !important;

                border-radius:
                    10px !important;

                background:
                    #0095f6 !important;

                color:
                    white !important;

                font-weight:
                    600 !important;

                cursor:
                    pointer !important;
            }


            .igsf-cancel {

                width:
                    100% !important;

                height:
                    42px !important;

                margin-top:
                    10px !important;

                border:
                    0 !important;

                border-radius:
                    10px !important;

                background:
                    #eee !important;

                color:
                    #222 !important;

                cursor:
                    pointer !important;
            }

        `;

        document.documentElement.appendChild(style);
    }


    // =====================================================
    // 等待 Instagram 页面加载
    // =====================================================

    function start() {

        if (!document.body) {

            setTimeout(start, 100);

            return;
        }

        addCSS();

        createFixButton();
    }


    start();

})();
