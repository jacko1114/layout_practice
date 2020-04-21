let vm = new Vue();

Vue.component("side-menu-tag", {
  template: `<div id="side-menu" :class="{'active':isOpen}">
                <div class="side-menu-header">
                    <i :class="i" v-for="i in header.icons"></i>
                    <p>{{header.name}}</p>
                </div>
                <div class="side-menu-contents">
                    <div class="side-menu-section" v-for="b in blocks">
                        <p>{{b.name}}</p>
                        <a href="javascript:;" :key="idx" v-for="(st,idx) in b.subIcons">
                          <span @click="changeView(st.c_name)">
                            <i :class="st.icon"></i>
                          {{st.title}}
                          </span>
                          </a>
                    </div>
                </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      header: {
        name: "Jacko",
        icons: ["fas fa-comment-alt", "fas fa-car-side"],
      },
      blocks: [
        {
          name: "管理",
          subIcons: [
            { title: "首頁", icon: "fas fa-house-user", c_name: "indexTag" },
            {
              title: "商品",
              icon: "fas fa-box-open",
              c_name: "productsTag",
            },
            { title: "訂單", icon: "fas fa-folder", c_name: "ordersTag" },
            {
              title: "優惠碼",
              icon: "fas fa-star-of-david",
              c_name: "promoCodeTag",
            },
          ],
        },
        {
          name: "商家",
          subIcons: [
            {
              title: "商店設定",
              icon: "fas fa-wrench",
              c_name: "shopSettingsTag",
            },
            {
              title: "訂閱計畫",
              icon: "fas fa-star",
              c_name: "subscriptionPlanTag",
            },
            {
              title: "人員管理",
              icon: "fas fa-user-cog",
              c_name: "teammateTag",
            },
          ],
        },
        {
          name: "個人設定",
          subIcons: [
            {
              title: "通知設定",
              icon: "fas fa-bell",
              c_name: "notificationsTag",
            },
          ],
        },
      ],
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
        vm.$emit("close-SM", this.isOpen);
      });
    },
    closeMenu() {
      vm.$on("close-SM", (close) => {
        this.isOpen = close;
      });
    },
    changeView(v) {
      this.isOpen = false;
      vm.$emit("close-SM", this.isOpen);
      vm.$emit("change-V", v);
    },
  },
  mounted() {
    this.open();
    this.closeMenu();
  },
});
Vue.component("nav-tag", {
  template: `<div class="wrapper" id="nav">
                <div class="left-nav" :class="{'active':isOpenSideMenu}">
                    <a href="javascipt:;" @click="openMenu"><i :class="leftIcons"></i></a>
                </div>
                <div class="right-nav">
                    <a href="javascript:;" @click=changeView(i.c_name) v-for="(i,idx) in rightIcons1" :key="idx" @blur="isOpenLangs=false;isLogout=false">
                      <i :class="i.icon"></i>
                      <span>{{i.name}}</span>
                    </a>
                    <a href="javascipt:;" v-for="(i,idx) in rightIcons2" @click="openLang(idx),openLogout(idx)" @blur="isOpenLangs=false;isLogout=false"><i :class="i.icon"></i><span>{{i.name}}</span></a>
                    <div class="lang" :class="{'active': isOpenLangs}">
                        <p v-for="l in langs"><span>{{l.abbrr}}</span>{{l.name}}</p>
                    </div>
                    <div class="logout" :class="{'active': isLogout}" >
                        <p>{{logout}}</p>
                    </div>
                </div>
            </div>`,
  data() {
    return {
      isOpenSideMenu: false,
      isOpenLangs: false,
      isLogout: false,
      show: false,
      leftIcons: ["fas fa-align-right"],
      rightIcons1: [
        {
          name: "幫助中心",
          icon: "fas fa-question-circle",
          c_name: "helpCenterTag",
        },
        {
          name: "主目錄",
          icon: "fas fa-window-restore",
          c_name: "mainDirectoryTag",
        },
      ],
      rightIcons2: [
        { name: "顯示語言", icon: "fas fa-language" },
        { name: "登出", icon: "fas fa-user-circle" },
      ],
      langs: [
        { abbrr: "Zh", name: "繁體中文" },
        { abbrr: "En", name: "English" },
      ],
      logout: "登出",
    };
  },
  methods: {
    openLang(idx) {
      if (idx !== 0) {
        return false;
      } else {
        this.isOpenLangs = true;
      }
    },
    openMenu() {
      this.isOpenSideMenu = !this.isOpenSideMenu;
      vm.$emit("open-SM", this.isOpenSideMenu);
    },
    openLogout(idx) {
      if (idx !== 1) {
        return false;
      } else {
        this.isLogout = true;
      }
    },
    closeMenu() {
      vm.$on("close-SM", (close) => (this.isOpenSideMenu = close));
    },
    changeView(v) {
      this.isOpen = false;
      vm.$emit("close-SM", this.isOpen);
      vm.$emit("change-V", v);
    },
  },
  mounted() {
    this.closeMenu();
  },
});
Vue.component("footer-tag", {
  template: `<div id="footer" :class="{'active':isOpen}">
            <p>JCart <i class="far fa-copyright"></i> {{date}}</p>
          </div>`,
  data() {
    return {
      isOpen: false,
      date: new Date().getUTCFullYear(),
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const indexTag = Vue.component("index-tag", {
  template: `<div id="index" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-lg-12">
                    <div class="col-lg-3" v-for="c in cards">
                      <p>{{c.item}}</p>
                      <h2><span v-if="c.currency">{{c.currency}}</span>{{c.num}}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "歡迎使用JCart!!",
      cards: [
        { item: "新用戶數", currency: null, num: "0" },
        { item: "本期活躍用戶數", currency: null, num: "0" },
        { item: "總用戶數", currency: null, num: "0" },
        { item: "新訂單數", currency: null, num: "0" },
        { item: "總訂單數", currency: null, num: "0" },
        { item: "本周銷售金額", currency: "TWD", num: "0.00" },
        { item: "本月銷售金額", currency: "TWD", num: "0.00" },
        { item: "總銷售金額", currency: "TWD", num: "0.00" },
        { item: "購買轉換率", currency: null, num: "0" },
      ],
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const mainDirectoryTag = Vue.component("main-directory-tag", {
  template: `<div id="main-directory" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-2" :class="a.order" v-for="a in accounts">
                    <i :class="a.user"></i>
                    <p>{{a.content}}</p>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      isSideMenuOpen: null,
      accounts: [
        { user: "fas fa-plus", content: "新加一台JCart購物車", order: "a" },
        { user: "", content: "JCarttest", order: "b" },
      ],
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const helpCenterTag = Vue.component("help-center-tag", {
  template: `<div id="help-center" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12" v-for="s in sections">
                    <a href="javascript:;">
                      <div class="col-lg-2">
                        <i :class="s.icon"></i>
                      </div>
                      <div class="col-lg-10">
                        <h3>{{s.title}}</h3>
                        <p>{{s.content}}</p>
                        <div class="col-lg-12 inner">
                          <div>
                            <i :class="u" v-for="u in s.usersicons"></i>
                          </div>
                          <div>
                            <p>此系列有{{s.artnum}}篇文章</p>
                            <p>撰寫者: {{s.author}}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      isSideMenuOpen: null,
      sections: [
        {
          icon: "fas fa-question-circle",
          title: "JCart是啥?",
          content: "想知道JCart是什麼嗎?適合你使用嗎?收費如何?在此通通回答你",
          usersicons: ["fas fa-user-circle"],
          artnum: 13,
          author: "Jacko",
        },
        {
          icon: "fas fa-cogs",
          title: "開始使用 - 建置?",
          content: "簡單開店3步驟，展示、轉換、成果!!",
          usersicons: ["fas fa-user-circle"],
          artnum: 5,
          author: "Jacko",
        },
        {
          icon: "fas fa-book-open",
          title: "店主必學密記 - 功能手冊?",
          content: "JCart有諸多便利功能輕鬆上架，開始前務必進來閱讀!!",
          usersicons: ["fas fa-user-circle", "fas fa-user-circle"],
          artnum: 13,
          author: "Jacko 和 Jessica",
        },
      ],
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const notificationsTag = Vue.component("notifications-tag", {
  template: `<div id="noti" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-lg-12">
                    <p>{{content}}</p>
                    <button disabled>{{button}}</button>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "通知設定",
      content: "通知將經由你的JCart發出。",
      button: "開啟通知",
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const ordersTag = Vue.component("orders-tag", {
  template: `<div id="orders" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-lg-12 row1">
                    <div>
                      <i :class="searchIcons"/>
                      <input type="text" :placeholder="placeholder">
                    </div>
                    <button><i :class="filter.icon"></i>{{filter.name}}</button>
                  </div>
                  <div class="col-lg-12 row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t}}</th>
                      </tr>
                      <tr>
                        <td colspan="7" class="txt-c">{{result}}</td>
                      </tr>
                      <tr>
                        <td colspan="7" class="txt-r">每頁行數: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "訂單列表",
      searchIcons: "fas fa-search",
      placeholder: "訂單編號 / 顧客名稱 / 連絡電話",
      filter: { name: "篩選", icon: "fas fa-filter" },
      thead: [
        "訂單編號",
        "顧客名稱",
        "取貨方式",
        "訂單狀態",
        "訂單金額",
        "購買日期",
        "操作",
      ],
      result: "No data available",
      pages: [10, 20, 30, 40],
      icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const productsTag = Vue.component("products-tag", {
  template: `<div id="products" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12 row1">
                    <h1>{{title}}</h1>
                    <button><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="col-lg-12 row2">
                    <table>
                      <tr>
                        <th v-for="t in thead" :width="t.width">{{t.name}}</th>
                      </tr>
                      <tr class="product">
                        <td>{{products[0]}}</td>
                        <td>{{products[1]}}</td>
                        <td><p v-for="p in products[2]">{{p}}</p></td>
                        <td>{{products[3]}}</td>
                        <td>{{products[4]}}</td>
                        <td><select><option v-for="p in products[5]">{{p}}</option></select></td>
                        <td>
                          <a href="javascript:;" v-for="p in products[6]">
                            <i :class="p.icon"/>
                            <span>{{p.action}}</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="7" class="txt-r">每頁行數: <select><option v-for="r in rows" :value="r">{{r}}</option></select>頁數: <select><option v-for="p in pages" :value="p">{{p}}</option></select> 1/1 of 1 <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "全部商品",
      button: { name: "新增", icon: "fas fa-plus" },
      thead: [
        { name: "商品名稱", width: "25%" },
        { name: "圖片", width: "10%" },
        { name: "商品規格", width: "20%" },
        { name: "貨存", width: "10%" },
        { name: "已售數量", width: "10%" },
        { name: "狀態", width: "10%" },
        { name: "操作", width: "15%" },
      ],
      products: [
        "模擬商品",
        "圖片",
        ["紅R $100[10]", "藍B $100[10]", "黃Y $100[10]"],
        "30",
        "0",
        ["上架中", "已下架"],
        [
          { action: "編輯", icon: "fas fa-pen" },
          { action: "刪除", icon: "fas fa-trash-alt" },
        ],
      ],
      rows: [10, 20, 30, 40],
      pages: [1],
      icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const promoCodeTag = Vue.component("promo-code-tag", {
  template: `<div id="promo-code" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12 row1">
                    <h1>{{title}}</h1>
                    <button><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="col-lg-12 row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t}}</th>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-c">{{result}}</td>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-r">每頁行數: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "優惠碼",
      button: { name: "新增", icon: "fas fa-plus" },
      thead: ["名稱", "折扣", "類別", "已使用/上限", "狀態", "操作"],
      result: "No data available",
      pages: [10, 20, 50, 100],
      icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
    };
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const subscriptionPlanTag = Vue.component("subscription-plan-tag", {
  template: `<div id="sub-plan" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12">
                    <div class="button">
                      <button @click="changeView(t.c_name)" v-for="t in tabs" :key="t.name"><i :class="t.icon"></i><span>{{t.name}}</span></button>
                    </div>
                    <component :is="view"/>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "訂閱計畫",
      view: "pricing",
      tabs: [
        { c_name: "pricing", name: "訂閱計畫", icon: "fas fa-star" },
        { c_name: "record", name: "付款記錄", icon: "fas fa-file-alt" },
      ],
    };
  },
  components: {
    pricing: {
      template: `<div id="pricing">
                  <h2>{{title}}</h2>
                  <div class="col-lg-3">
                    <div class="card-title">
                      <h3>{{free_t}}</h3>
                      <span>{{free_a}}</span>
                      <p>{{free_st}}</p>
                    </div>
                    <div class="card-body">
                      <span class="currency">{{free_c}}</span>
                      <span class="money">{{free_m}}</span>
                      <span class="date">{{free_d}}</span>
                    </div>
                    <div class="card-footer">
                      <p>{{free_content[0]}}{{free_maxnum}}</p>
                      <p>{{free_content[1]}}<span class="heightlight">{{free_maxnum_h}}</span>{{free_content[2]}}</p>
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="card-title">
                      <h3>{{pro_t}}</h3>
                      <span>{{pro_a}}</span>
                      <p>{{pro_st}}</p>
                    </div>
                    <div class="card-body">
                      <span class="currency">{{pro_c}}</span>
                      <span class="money">{{pro_m}}</span>
                      <span class="date">{{pro_d}}</span>
                    </div>
                    <div class="card-footer1">
                      <strong>{{pro_content}}</strong>
                      <div class="items">
                        <p v-for="f in pro_features"><i :class="f.icon"></i>{{f.content}}</p>
                      </div>
                    </div>
                    <div class="card-footer2">
                      <button class="levelup">{{button}}</button>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "訂閱計畫",
          free_t: "免費版",
          free_a: "現正使用",
          free_st: "簡易開店助你打開網上銷售",
          free_c: "USD",
          free_m: "0",
          free_d: "/月",
          free_content: ["活躍用戶上限: ", "今期餘下", "位活躍用戶數"],
          free_maxnum: "200位",
          free_maxnum_h: "200",
          pro_t: "專家版",
          pro_a: null,
          pro_st: "完整功能輕鬆上手，經營網店入門首選",
          pro_c: "USD",
          pro_m: "5",
          pro_d: "/月",
          pro_content: "基本包括所有免費版功能及以下進階功能",
          pro_features: [
            { icon: "fas fa-check", content: "客人留言通知" },
            { icon: "fas fa-check", content: "顧客售後通知" },
            { icon: "fas fa-check", content: "專屬客戶人員支援" },
            { icon: "fas fa-check", content: "多個管理員和工作人員帳號" },
            { icon: "fas fa-check", content: "購物車未結帳提示" },
            { icon: "fas fa-check", content: "購物滿額送贈功能" },
          ],
          button: "升級計畫",
        };
      },
    },
    record: {
      template: `<div id="record">
                  <table>
                    <tr colspan="5">
                      <h2 class="title">{{tabTitle1}}</h2>
                    </tr>
                    <tr>
                      <td colspan="5">{{result1}}</td>
                    </tr>
                  </table>
                  <table>
                    <tr colspan="5">
                      <h2>{{tabTitle2}}</h2>
                    </tr>
                    <tr>
                      <th v-for="t in thead" :width="t.width">{{t.name}}</th>
                    </tr>
                    <tr>
                      <td colspan="5" class="txt-c">{{result2}}</td>
                    </tr>
                  </table>
                </div>`,
      data() {
        return {
          tabTitle1: "付款方式",
          result1: "暫無付款方式",
          tabTitle2: "付款記錄",
          thead: [
            { name: "時間", width: "20%" },
            { name: "金額", width: "20%" },
            { name: "付款時間", width: "40%" },
            { name: "狀態", width: "10%" },
            { name: "收據", width: "10%" },
          ],
          result2: "暫無付款方式",
        };
      },
    },
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
    changeView(v) {
      this.view = v;
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const shopSettingsTag = Vue.component("shop-settings-tag", {
  template: `<div id="shop" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12">
                    <button @click="changeView(t.c_name)" v-for="t in tabs" :key="t.name"><i :class="t.icon"></i>{{t.name}}</button>
                    <component :is="view"/>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "施工中",
      view: "basic_info",
      tabs: [
        { c_name: "basic_info", name: "商品設定", icon: "fas fa-cog" },
        { c_name: "shipping", name: "取貨方式", icon: "fas fa-track" },
        { c_name: "payment", name: "支付方式", icon: "fas fa-money-check-alt" },
        {
          c_name: "productsettings",
          name: "商品顯示設定",
          icon: "fas fa-cogs",
        },
      ],
    };
  },
  components: {
    basic_info: {
      template: `<div id="basic_info">
                  <div class="col-lg-12">
                    <div class="card-title">
                      <h2>{{title}}</h2>
                    </div>
                    <div class="card-body">
                      <label>{{shop_label[0]}}</label>
                      <input type="text" v-model="shop_name">
                      <label>{{shop_label[1]}}</label>
                      <input type="text" v-model="shop_mail">
                      <select>
                        <option value="">--請選擇--</option>
                        <option v-for="s in shop_type" value="s">{{s}}</option>
                      </select>
                    </div>
                    <div class="card-footer">
                      <button>{{button}}</button>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "商店設定",
          shop_label: ["商店名稱", "商店電郵"],
          shop_name: "J商店測試",
          shop_mail: "j@gmail.com",
          shop_type: ["動物、寵物用品", "健康、美容", "電子產品"],
          button: "更新",
        };
      },
    },
    shipping: {
      template: `<div id="shipping">
                  <div class="col-lg-12">
                    <table>
                      <tr>
                        <h1>{{title}}</h1>
                        <button><i :class="button.icon"></i>{{button.name}}</button>
                      </tr>
                      <tr>
                        <th v-for="t in thead" :width="t.width">{{t.name}}</th>
                      </tr>
                      <tr class="shipping" v-for="s in shippings">
                        <td>{{s.name}}</td>
                        <td>{{s.claim}}</td>
                        <td>{{s.status}}</td>
                        <td>
                          <a href="javascript:;" v-for="sa in s.actions">
                            <i :class="sa.icon"/>
                            <span>{{sa.action}}</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>`,
      data() {
        return {
          title: "設定商店的取貨方式",
          button: { name: "新增", icon: "fas fa-plus" },
          thead: [
            { name: "取貨方式", width: "20%" },
            { name: "取貨指示", width: "20%" },
            { name: "狀態", width: "20%" },
            { name: "操作", width: "20%" },
          ],
          shippings: [
            {
              name: "快快快遞(假)",
              claim: "購買滿$300包郵，$300以下運貨到付",
              status: "開啟中",
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
            {
              name: "快慢快遞(假)",
              claim: "購買滿$600包郵，$600以下運貨到付",
              status: "開啟中",
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
            {
              name: "慢慢快遞(假)",
              claim: "購買滿$1000包郵，$1000以下運貨到付",
              status: "開啟中",
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
          ],
        };
      },
    },
    payment: {
      template: `<div id="payment">
                  <div class="col-lg-12">
                    <table>
                      <tr>
                        <h1>{{title}}</h1>
                        <button><i :class="button.icon"></i>{{button.name}}</button>
                      </tr>
                      <tr>
                        <th v-for="t in thead" :width="t.width">{{t.name}}</th>
                      </tr>
                      <tr class="payment" v-for="p in payments">
                        <td>{{p.name}}</td>
                        <td>{{p.claim}}</td>
                        <td>{{p.status}}</td>
                        <td>
                          <a href="javascript:;" v-for="pa in p.actions">
                            <i :class="pa.icon"/>
                            <span>{{pa.action}}</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>`,
      data() {
        return {
          title: "設定商店的取貨方式",
          button: { name: "新增", icon: "fas fa-plus" },
          thead: [
            { name: "支付方式", width: "20%" },
            { name: "支付指示", width: "20%" },
            { name: "狀態", width: "20%" },
            { name: "操作", width: "20%" },
          ],
          payments: [
            {
              name: "快快快遞(假)",
              claim: "購買滿$300包郵，$300以下運貨到付",
              status: "開啟中",
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
            {
              name: "快慢快遞(假)",
              claim: "購買滿$600包郵，$600以下運貨到付",
              status: "開啟中",
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
            {
              name: "慢慢快遞(假)",
              claim: "購買滿$1000包郵，$1000以下運貨到付",
              status: "開啟中",
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
          ],
        };
      },
    },
    productsettings: {
      template: `<div id="productsettings">
                  <div class="col-lg-12">
                    <h3>{{title}}</h3>
                  </div>
                  <div class="col-lg-12" v-for="s in settings">
                    <div class="card-title">
                      <p>
                        <span>{{s.status}}</span>
                        {{s.item}}
                      </p>
                      <i :class="s.actionicon"><span>{{s.actionname}}</span></i>
                    </div>
                    <div class="card-body">
                      <input type="checkbox">
                      <label>{{s.item}}</label>
                      <button>{{s.button}}</button>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "以下設定會顯示於商品詳情頁面內：",
          settings: [
            {
              status: "已停用",
              item: "顯示商品庫存數量",
              actionname: "編輯",
              actionicon: "fas fa-edit",
              button: "更新",
            },
            {
              status: "已停用",
              item: "顯示已售商品數量",
              actionname: "編輯",
              actionicon: "fas fa-edit",
              button: "更新",
            },
            {
              status: "已停用",
              item: "購買須知",
              actionname: "編輯",
              actionicon: "fas fa-edit",
              button: "更新",
            },
          ],
        };
      },
    },
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
    changeView(v) {
      this.view = v;
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const teammateTag = Vue.component("teammate-tag", {
  template: `<div id="teammate" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-lg-12">
                    <button @click="changeView(t.c_name)" v-for="t in tabs" :key="t.name"><i :class="t.icon"></i>{{t.name}}</button>
                    <component :is="view"/>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "人員管理",
      view: "admin",
      tabs: [
        { c_name: "admin", name: "管理者", icon: "fas fa-user-friends" },
        { c_name: "helper", name: "工作人員", icon: "fas fa-user" },
      ],
    };
  },
  components: {
    admin: {
      template: `<div id="admin">
                  <div class="col-lg-12 row1">
                    <h1>{{title}}</h1>
                    <button><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="col-lg-12 row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t}}</th>
                      </tr>
                      <tr v-for="a in admins">
                        <td><i :class="a.icon"><span class="name">{{a.name}}</span><span class="level">{{a.level}}</span></i></td>
                        <td><span :classs="a.status1">{{a.status2}}</span></td>
                        <td> 
                          <a href="javascript:;">
                            <i :class="a.a_icon"/>
                            <span>{{a.action}}</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-r">每頁行數: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>`,
      data() {
        return {
          title: "管理者",
          button: { name: "邀請管理員", icon: "fas fa-plus" },
          thead: ["帳號", "狀態", "操作"],
          admins: [
            {
              icon: "fas fa-user-circle",
              name: "新管理者",
              level: null,
              status1: "wait",
              status2: "等待中",
              action: "刪除",
              a_icon: "fas fa-trash-alt",
            },
            {
              icon: "fas fa-user-circle",
              name: "Jacko",
              level: "擁有者",
              status1: "active",
              status2: "啟用",
              action: null,
              a_icon: null,
            },
          ],
          pages: [10, 20, 50, 100],
          icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
        };
      },
    },
    helper: {
      template: `<div id="helper">
                  <div class="col-lg-12 row2">
                    <table>
                      <tr colspan="6">
                        <h1>{{title}}</h1>
                        <button><i :class="button.icon"></i>{{button.name}}</button>
                      </tr>
                      <tr>
                        <th v-for="t in thead" :width="t.width">{{t.name}}</th>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-c">{{result}}</td>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-r">每頁行數: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>`,
      data() {
        return {
          title: "工作人員",
          button: { name: "新增", icon: "fas fa-plus" },
          thead: [
            { name: "帳號", width: "80%" },
            { name: "狀態", width: "10%" },
            { name: "操作", width: "10%" },
          ],
          result: "No data available",
          pages: [10, 20, 50, 100],
          icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
        };
      },
    },
  },
  methods: {
    open() {
      vm.$on("open-SM", (open) => {
        this.isOpen = open;
      });
    },
    close() {
      vm.$on("close-SM", (close) => (this.isOpen = close));
    },
    changeView(v) {
      this.view = v;
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});

const app = new Vue({
  el: "#app",
  data() {
    return {
      view: indexTag,
    };
  },
  components: {
    indexTag,
    mainDirectoryTag,
    helpCenterTag,
    notificationsTag,
    ordersTag,
    productsTag,
    subscriptionPlanTag,
    shopSettingsTag,
    teammateTag,
    promoCodeTag,
  },
  methods: {
    changeView() {
      vm.$on("change-V", (v) => {
        this.view = v;
      });
    },
  },
  mounted() {
    this.changeView();
  },
});