let vm = new Vue();

Vue.component("side-menu-tag", {
  template: `<div id="side-menu" :class="{'active':isOpen}">
                <div class="side-menu-header">
                    <i :class="i" v-for="i in header.icons"></i>
                    <p>{{header.name}}</p>
                </div>
                <div class="side-menu-contents">
                    <div class="side-menu-section" v-for="(b,idx1) in blocks">
                        <p>{{b.name}}</p>
                        <a href="javascript:;" :key="idx2" v-for="(st,idx2) in b.subIcons" :class="{'active':st.active}">
                          <i :class="st.icon" @click="changeView(st.c_name);changeTag(idx1,idx2)">
                            <span>
                              {{st.title}}
                            </span>
                          </i>
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
            {
              title: "首頁",
              icon: "fas fa-house-user",
              c_name: "indexTag",
              active: true,
            },
            {
              title: "商品",
              icon: "fas fa-box-open",
              c_name: "productsTag",
              active: false,
            },
            {
              title: "訂單",
              icon: "fas fa-folder",
              c_name: "ordersTag",
              active: false,
            },
            {
              title: "優惠碼",
              icon: "fas fa-star-of-david",
              c_name: "promoCodeTag",
              active: false,
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
              active: false,
            },
            {
              title: "訂閱計畫",
              icon: "fas fa-star",
              c_name: "subscriptionPlanTag",
              active: false,
            },
            {
              title: "人員管理",
              icon: "fas fa-user-cog",
              c_name: "teammateTag",
              active: false,
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
              active: false,
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
    changeTag(idx1, idx2) {
      let l = this.blocks.length;
      for (let i = 0; i < l; i++) {
        let z = this.blocks[i].subIcons.length;
        for (let x = 0; x < z; x++) {
          this.blocks[i].subIcons[x].active = false;
        }
      }
      this.blocks[idx1].subIcons[idx2].active = true;
    },
  },
  mounted() {
    this.open();
    this.closeMenu();
  },
});
Vue.component("nav-tag", {
  template: `<div id="nav">
                <div class="wrapper">
                  <div class="left-nav" :class="{'active':isOpenSideMenu}">
                      <a href="javascript:;" @click="openMenu"><i :class="leftIcons"></i></a>
                  </div>
                  <div class="right-nav">
                      <a href="javascript:;" @click=changeView(i.c_name) v-for="(i,idx) in rightIcons1" :key="idx">
                        <i :class="i.icon"></i>
                        <span>{{i.name}}</span>
                      </a>
                      <a href="javascript:;" v-for="(i,idx) in rightIcons2" @click="openLang(idx),openLogout(idx)"><i :class="i.icon"></i><span>{{i.name}}</span></a>
                      <div class="lang" :class="{'active': isOpenLangs}" ref="lang">
                          <p v-for="(l,idx) in langs" :class="{'active': l.active}" @click="changeLang(idx,l.abbrr)"><span>{{l.abbrr}}</span>{{l.name}}</p>
                      </div>
                      <div class="logout" :class="{'active': isLogout}" ref="logout">
                          <p>{{logout}}</p>
                      </div>
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
        { abbrr: "Zh", name: "繁體中文", active: true },
        { abbrr: "En", name: "English", active: false },
      ],
      logout: "登出",
    };
  },
  methods: {
    openLang(idx) {
      if (idx !== 0) {
        return false;
      } else {
        this.isOpenLangs = !this.isOpenLangs;
      }
    },
    closeSelect() {
      if (this.isOpenLangs === true || this.isLogout === true) {
        this.isOpenLangs = false;
        this.isLogout = false;
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
        this.isLogout = !this.isLogout;
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
    changeLang(idx, a) {
      let l = this.langs.length;
      for (let i = 0; i < l; i++) {
        this.langs[i].active = false;
      }
      this.langs[idx].active = true;
      this.closeSelect();
      vm.$emit("lang", a);
    },
  },
  mounted() {
    this.closeMenu();
  },
  created() {
    let self = this;
    window.addEventListener("click", (e) => {
      if (!self.$el.contains(e.target)) {
        this.isOpenLangs = false;
      }
      if (!self.$el.contains(e.target)) {
        this.isLogout = false;
      }
    });
  },
});
Vue.component("footer-tag", {
  template: `<div id="footer" :class="{'active':isOpen}">
              <div class="wrapper clearfix">
                <div class="col-12">
                  <p>JCart <i class="far fa-copyright"></i> {{date}}</p>
                </div>
              </div>
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
                  <div class="col-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-12">
                    <div class="col-11 col-md-5 col-lg-3" v-for="c in cards">
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
                  <div class="col-6 col-lg-2" :class="a.order" v-for="a in accounts">
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
        { user: "", content: "JCart測試", order: "b" },
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
                  <div class="col-12" v-for="s in sections">
                    <a href="javascript:;">
                      <div class="col-11 col-lg-2">
                        <i :class="s.icon"/>
                      </div>
                      <div class="col-10 col-lg-10">
                        <h3>{{s.title}}</h3>
                        <p>{{s.content}}</p>
                        <div class="col-12 inner">
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
                  <div class="col-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-12">
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
      content: "通知將經由你的 JCart 發出。",
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
  template: `<div id="orders" :class="{'active':isOpen}"  @click.self="filterPop.isOpen = false">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-12 row1">
                    <div>
                      <i :class="searchIcons"/>
                      <input type="text" :placeholder="placeholder">
                    </div>
                    <button @click="filterPop.isOpen = !filterPop.isOpen">
                      <i :class="filter.icon"></i>{{filter.name}}
                    </button>
                    <div class="filterPop" :class="{'active':filterPop.isOpen}">
                      <h3>{{filterPop.title}}</h3>
                      <label>{{filterPop.label}}</label>
                      <select><option v-for="s in filterPop.selects">{{s}}</option></select>
                      <button @click.self="filterPop.isOpen = false">{{filterPop.button}}</button>
                    </div>
                  </div>
                  <div class="row2">
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
      filterPop: {
        isOpen: false,
        title: "按訂單狀態篩選",
        label: "選擇訂單狀態",
        selects: [
          "等待付款中",
          "等待收款確認",
          "已付款",
          "全部寄出",
          "部分出貨",
          "全部取貨",
          "取消訂單",
        ],
        button: "確認",
      },
      thead: [
        "訂單編號",
        "顧客名稱",
        "取貨方式",
        "訂單狀態",
        "訂單金額",
        "購買日期",
        "操作",
      ],
      result: "無符合資料",
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
                  <div class="col-12 row1">
                    <h1>{{title}}</h1>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t.name}}</th>
                      </tr>
                      <tr class="product">
                        <td>{{products[0]}}</td>
                        <td><img :src="products[1]" class="image"></td>
                        <td><p v-for="p in products[2]">{{p}}</p></td>
                        <td>{{products[3]}}</td>
                        <td>{{products[4]}}</td>
                        <td><select><option v-for="p in products[5]">{{p}}</option></select></td>
                        <td>
                          <a href="javascript:;"  @click="editPop.isOpen = true">
                            <i :class="products[6][0].icon"/>
                            <span>{{products[6][0].action}}</span>
                          </a>
                          <a href="javascript:;" @click="delPop.isOpen = true">
                            <i :class="products[6][1].icon"/>
                            <span>{{products[6][1].action}}</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="7" class="txt-r">每頁行數: <select><option v-for="r in rows" :value="r">{{r}}</option></select>頁數: <select><option v-for="p in pages" :value="p">{{p}}</option></select> 1/1 of 1 <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="popup-background add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                  <div class="popup">
                    <div class="col-12 modal-head">
                      <h2>{{addPop.title}}</h2>
                      <select><option v-for="p in products[5]">{{p}}</option></select>
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{addPop.items[0]}}</h4>
                      <input type="text">
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{addPop.items[1]}}</h4>
                      <input type="file">
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{addPop.items[2]}}</h4>
                      <table>
                        <tr>
                          <th v-for="t in addPop.tableHead">{{t}}</th>
                        </tr>
                        <tr v-for="v in addPop.variants">
                          <td><input type="text" v-model="v.name" class="variants"></td>
                          <td><input type="number" v-model="v.price" class="variants"></td>
                          <td class="amount"><input type="number" v-model="v.remain" class="remain"><span>/</span><input type="number" v-model="v.total"></td>
                        </tr>
                      </table>
                    </div>
                    <div class="col-12 modal-footer">
                      <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                      <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                    </div>
                  </div>
                </div>
                <div class="popup-background edit" :class="{'active':editPop.isOpen}" @click.self="editPop.isOpen = false">
                  <div class="popup">
                    <div class="col-12 modal-head">
                      <h2>{{editPop.title}}</h2>
                      <select><option v-for="p in products[5]">{{p}}</option></select>
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{editPop.items[0]}}</h4>
                      <input type="text" v-model="products[0]">
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{editPop.items[1]}}</h4>
                      <img :src="editPop.imgpath">
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{editPop.items[2]}}</h4>
                      <table>
                        <tr>
                          <th v-for="t in editPop.tableHead">{{t}}</th>
                        </tr>
                        <tr v-for="v in editPop.variants">
                          <td><input type="text" v-model="v.name" class="variants"></td>
                          <td><input type="number" v-model="v.price" class="variants"></td>
                          <td class="amount"><input type="number" v-model="v.remain" class="remain"><span>/</span><input type="number" v-model="v.total"></td>
                        </tr>
                      </table>
                    </div>
                    <div class="col-12 modal-footer">
                      <a href="javascript:;" :class="editPop.buttons[0].class" @click="editPop.isOpen = false">{{editPop.buttons[0].name}}</a>
                      <a href="javascript:;" :class="editPop.buttons[1].class">{{editPop.buttons[1].name}}</a>
                    </div>
                  </div>
                </div>
                <div class="popup-background del" :class="{'active':delPop.isOpen}" @click.self="delPop.isOpen = false">
                  <div class="popup">
                    <div class="col-12 modal-head">
                      <i :class="delPop.icon"/>
                    </div>
                    <div class="col-12 modal-body">
                      <p>你確定刪除"{{products[0]}}"?</p>
                    </div>
                    <div class="col-12 modal-footer">
                      <a href="javascript:;" :class="delPop.buttons[0].class" @click="delPop.isOpen = false">{{delPop.buttons[0].name}}</a>
                      <a href="javascript:;" :class="delPop.buttons[1].class">{{delPop.buttons[1].name}}</a>
                    </div>
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
        { name: "商品名稱" },
        { name: "商品圖片" },
        { name: "商品規格" },
        { name: "貨存" },
        { name: "已售數量" },
        { name: "狀態" },
        { name: "操作" },
      ],
      products: [
        "模擬商品",
        "./images/cart.jpg",
        ["紅R $100[10]", "藍B $100[10]", "黃Y $100[10]"],
        30,
        0,
        ["上架中", "已下架"],
        [
          { action: "編輯", icon: "fas fa-pen" },
          { action: "刪除", icon: "fas fa-trash-alt" },
        ],
      ],
      rows: [10, 20, 30, 40],
      pages: [1],
      icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
      addPop: {
        isOpen: false,
        title: "新增商品",
        items: ["商品名稱", "商品圖片", "商品規格"],
        tableHead: ["規格(尺寸、顏色...)", "價錢", "剩餘數量/總數"],
        variants: [{ name: "", price: 0, remain: 0, total: 0 }],
        buttons: [
          { name: "返回", class: "cancel" },
          { name: "建立", class: "create" },
        ],
      },
      editPop: {
        isOpen: false,
        title: "更新商品",
        imgpath: "./images/cart.jpg",
        items: ["商品名稱", "商品圖片", "商品規格"],
        tableHead: ["規格(尺寸、顏色...)", "價錢", "剩餘數量/總數"],
        variants: [
          { name: "紅R", price: 100, remain: 10, total: 10 },
          { name: "藍B", price: 100, remain: 10, total: 10 },
          { name: "黃Y", price: 100, remain: 10, total: 10 },
        ],
        buttons: [
          { name: "返回", class: "cancel" },
          { name: "更新", class: "update" },
        ],
      },
      delPop: {
        isOpen: false,
        icon: "fas fa-exclamation",
        buttons: [
          { name: "取消", class: "cancel" },
          { name: "刪除", class: "delete" },
        ],
      },
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
                  <div class="col-12 row1">
                    <h1>{{title}}</h1>
                    <button @click="promoCodeAddPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
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
                <div class="popup-background promo-code-add" :class="{'active':promoCodeAddPop.isOpen}" @click.self="promoCodeAddPop.isOpen = false">
                  <div class="popup">
                    <div class="col-12 modal-head">
                      <h2>{{promoCodeAddPop.title}}</h2>
                      <button @click="promoCodeAddPop.isOpen = false"><i :class="promoCodeAddPop.icon"></i></button>
                    </div>
                    <div class="col-12 modal-body">
                      <div class="col-12 col-md-6">
                        <h4>{{promoCodeAddPop.items[0]}}</h4>
                        <label>{{promoCodeAddPop.subitems[0]}}</label>
                        <input type="text">
                      </div>
                      <div class="col-12 col-md-6 times">
                        <label>{{promoCodeAddPop.subitems[1]}}</label>
                        <input type="number">
                      </div>
                      <div class="col-12 col-md-6">
                        <h4>{{promoCodeAddPop.items[1]}}</h4>
                        <input type="radio" checked="true">
                        <label>{{promoCodeAddPop.date}}</label>
                      </div>
                      <div class="col-12 col-md-3" v-for="v in promoCodeAddPop.validDate">
                        <label>{{v}}</label>
                        <input type="date">
                      </div>
                      <div class="col-6">
                        <input type="radio" name="discount" :value="promoCodeAddPop.discount[0]" v-model="promoCodeAddPop.picked" :id="promoCodeAddPop.discount[0]">
                        <label :for="promoCodeAddPop.discount[0]">{{promoCodeAddPop.discount[0]}}</label>
                        <input type="radio" name="discount" :value="promoCodeAddPop.discount[1]" v-model="promoCodeAddPop.picked" :id="promoCodeAddPop.discount[1]">
                        <label :for="promoCodeAddPop.discount[1]">{{promoCodeAddPop.discount[1]}}</label>
                      </div>
                      <div class="col-12 col-md-6" v-if="promoCodeAddPop.picked === '按金額折扣'">
                        <label>{{promoCodeAddPop.subdiscount[0]}}</label>
                        <span class="dollar">$</span><input type="number" class="money">
                      </div>
                      <div class="col-12 col-md-6" v-else>
                        <label>{{promoCodeAddPop.subdiscount[1]}}</label>
                        <input type="number"><span class="percent">%</span>
                      </div>
                      <div class="col-12">
                        <h4>{{promoCodeAddPop.items[2]}}</h4>
                        <select>
                          <option v-for="l in promoCodeAddPop.limits" :value="l">{{l}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 modal-footer">
                      <a href="javascript:;" :class="promoCodeAddPop.buttons[0].class" @click="promoCodeAddPop.isOpen = false">{{promoCodeAddPop.buttons[0].name}}</a>
                      <a href="javascript:;" :class="promoCodeAddPop.buttons[1].class">{{promoCodeAddPop.buttons[1].name}}</a>
                    </div>
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
      result: "無符合資料",
      pages: [10, 20, 50, 100],
      icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
      promoCodeAddPop: {
        isOpen: false,
        title: "優惠碼設定",
        icon: "fas fa-times",
        items: ["新增優惠碼", "有效時間", "優惠折扣", "使用限制"],
        subitems: ["優惠碼名稱", "可使用次數"],
        date: "指定範圍",
        validDate: ["生效日期", "到期日期"],
        discount: ["按金額折扣", "優惠折扣"],
        subdiscount: ["折扣金額", "折扣優惠"],
        picked: "按金額折扣",
        limits: [
          "不設限制",
          "指定商品使用",
          "特價商品不可使用",
          "最低消費滿指定金額才可使用",
        ],
        buttons: [
          { name: "返回", class: "cancel" },
          { name: "新增", class: "create" },
        ],
      },
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
                  <div class="col-12">
                    <div class="button">
                      <button @click="changeView(t.c_name);changeTab(idx);" :class="{'active': t.active}" v-for="(t,idx) in tabs" :key="t.name"><i :class="t.icon"></i>{{t.name}}</button>
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
        {
          c_name: "pricing",
          name: "訂閱計畫",
          icon: "fas fa-star",
          active: true,
        },
        {
          c_name: "record",
          name: "付款記錄",
          icon: "fas fa-file-alt",
          active: false,
        },
      ],
    };
  },
  components: {
    pricing: {
      template: `<div id="pricing">
                  <h1>{{title}}</h1>
                  <div class="col-12 col-lg-3 free">
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
                  <div class="col-12 col-lg-8 pro">
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
                    <div class="card-footer2 clearfix">
                      <button class="levelup" @click="planUpdatePop.isOpen = true">{{button}}</button>
                    </div>
                  </div>
                  <div class="popup-background plan-update" :class="{'active':planUpdatePop.isOpen}" @click.self="planUpdatePop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <i :class="planUpdatePop.icon"/>
                      </div>
                      <div class="col-12 modal-body">
                        <p>{{planUpdatePop.content}}</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="planUpdatePop.buttons[0].class" @click="planUpdatePop.isOpen = false">{{planUpdatePop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="planUpdatePop.buttons[1].class">{{planUpdatePop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div> 
                </div>`,
      data() {
        return {
          title: "訂閱計畫",
          free_t: "免費版",
          free_a: "現正使用",
          free_st: "簡易開店助你打開網上銷售",
          free_c: "NTD",
          free_m: "0",
          free_d: "/月",
          free_content: ["活躍用戶上限: ", "今期餘下", "位活躍用戶數"],
          free_maxnum: "200位",
          free_maxnum_h: "200",
          pro_t: "專家版",
          pro_a: null,
          pro_st: "完整功能輕鬆上手，經營網店入門首選",
          pro_c: "NTD",
          pro_m: "200",
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
          planUpdatePop: {
            isOpen: false,
            icon: "fas fa-exclamation",
            content:
              "你將導向至信用卡付款平台，你需填寫信用卡資料授權每月訂閱收費，月費將於每月結尾按當前活躍人數從你的信用卡自動收取。",
            buttons: [
              { name: "返回", class: "cancel" },
              { name: "繼續", class: "continue" },
            ],
          },
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
                      <th v-for="t in thead">{{t.name}}</th>
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
            { name: "時間" },
            { name: "金額" },
            { name: "付款時間" },
            { name: "狀態" },
            { name: "收據" },
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
    changeTab(idx) {
      let l = this.tabs.length;
      for (let i = 0; i < l; i++) {
        this.tabs[i].active = false;
      }
      this.tabs[idx].active = true;
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
                  <div class="col-12">
                    <div class="button">
                      <button @click="changeView(t.c_name);changeTab(idx);" :class="{'active': t.active}" v-for="(t,idx) in tabs" :key="t.name"><i :class="t.icon"></i>{{t.name}}</button>
                    </div>
                    <component :is="view"/>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      view: "basic_info",
      tabs: [
        {
          c_name: "basic_info",
          name: "商品設定",
          icon: "fas fa-cog",
          active: true,
        },
        {
          c_name: "shipping",
          name: "取貨方式",
          icon: "fas fa-truck",
          active: false,
        },
        {
          c_name: "payment",
          name: "支付方式",
          icon: "fas fa-money-check-alt",
          active: false,
        },
        {
          c_name: "productsettings",
          name: "商品顯示設定",
          icon: "fas fa-cogs",
          active: false,
        },
      ],
    };
  },
  components: {
    basic_info: {
      template: `<div id="basic_info" class="clearfix">
                  <div class="col-12">
                    <div class="card-title">
                      <h2>{{title}}</h2>
                    </div>
                    <div class="card-body">
                      <label>{{shop_label[0]}}</label>
                      <input type="text" v-model="shop_name">
                      <label>{{shop_label[1]}}</label>
                      <input type="text" v-model="shop_mail">
                      <label>{{shop_label[2]}}</label>
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
          shop_label: ["商店名稱", "商店電郵", "選擇商店類型"],
          shop_name: "J商店測試",
          shop_mail: "j@gmail.com",
          shop_type: ["動物、寵物用品", "健康、美容", "電子產品"],
          button: "更新",
        };
      },
    },
    shipping: {
      template: `<div id="shipping" class="clearfix">
                  <div class="col-12 row1">
                    <h3>{{title}}</h3>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t.name}}</th>
                      </tr>
                      <tr class="shipping" v-for="(s,idx) in shippings">
                        <td>{{s.name}}</td>
                        <td>{{s.claim}}</td>
                        <td >
                          <span :class="s.statusO.class" v-if="s.status">{{s.statusO.name}}</span>
                          <span :class="s.statusC.class" v-else>{{s.statusC.name}}</span>
                        </td>
                        <td>
                          <a href="javascript:;">
                            <i :class="s.actions[0].icon" @click="editPop[idx].isOpen = true"/>
                            <span>{{s.actions[0].action}}</span>
                          </a>
                          <a href="javascript:;">
                            <i :class="s.actions[1].icon" @click="shippings[idx].status = !shippings[idx].status"/>
                            <span>{{s.actions[1].action}}</span>
                          </a>
                          <a href="javascript:;">
                            <i :class="s.actions[2].icon" @click="delPop[idx].isOpen = true" />
                            <span>{{s.actions[2].action}}</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="popup-background del" :class="{'active':d.isOpen}" @click.self="d.isOpen = false" v-for="d in delPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <i :class="d.icon"/>
                      </div>
                      <div class="col-12 modal-body">
                        <p>你確定刪除"{{d.name}}"?</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="d.buttons[0].class" @click="d.isOpen = false">{{d.buttons[0].name}}</a>
                        <a href="javascript:;" :class="d.buttons[1].class">{{d.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background shipping-edit" :class="{'active':e.isOpen}" @click.self="e.isOpen = false" v-for="e in editPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{e.title}}</h2>
                        <button @click="e.isOpen = false"><i :class="e.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{e.label[0]}}</h4>
                        <input type="text" v-model="e.content[0]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{e.label[1]}}</h4>
                        <input type="text" v-model="e.content[1]">
                        <p>{{e.noti}}</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="e.buttons[0].class" @click="e.isOpen = false">{{e.buttons[0].name}}</a>
                        <a href="javascript:;" :class="e.buttons[1].class">{{e.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background shipping-add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{addPop.title}}</h2>
                        <button @click="addPop.isOpen = false"><i :class="addPop.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[0]}}</h4>
                        <input type="text" v-model="addPop.content[0]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[1]}}</h4>
                        <input type="text" v-model="addPop.content[1]">
                        <p>{{addPop.noti}}</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "設定商店的取貨方式",
          button: { name: "新增", icon: "fas fa-plus" },
          thead: [
            { name: "取貨方式" },
            { name: "取貨指示" },
            { name: "狀態" },
            { name: "操作" },
          ],
          shippings: [
            {
              name: "快快快遞(假)",
              claim: "購買滿$300包郵，$300以下運貨到付",
              statusO: { name: "開啟中", class: "open" },
              statusC: { name: "已停用", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
            {
              name: "快慢快遞(假)",
              claim: "購買滿$600包郵，$600以下運貨到付",
              statusO: { name: "開啟中", class: "open" },
              statusC: { name: "已停用", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
            {
              name: "慢慢快遞(假)",
              claim: "購買滿$1000包郵，$1000以下運貨到付",
              statusO: { name: "開啟中", class: "open" },
              statusC: { name: "已停用", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
          ],
          delPop: [
            {
              isOpen: false,
              name: "快快快遞(假)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "刪除", class: "delete" },
              ],
            },
            {
              isOpen: false,
              name: "快慢快遞(假)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "刪除", class: "delete" },
              ],
            },
            {
              isOpen: false,
              name: "慢慢快遞(假)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "刪除", class: "delete" },
              ],
            },
          ],
          editPop: [
            {
              isOpen: false,
              title: "修改取貨方式",
              icon: "fas fa-times",
              label: ["顯示名稱", "取貨指示"],
              content: ["快快快遞(假)", "購買滿$300包郵，$300以下運貨到付"],
              noti: "指示會顯示於結帳頁面!",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "更新", class: "update" },
              ],
            },
            {
              isOpen: false,
              title: "修改取貨方式",
              icon: "fas fa-times",
              label: ["顯示名稱", "取貨指示"],
              content: ["快慢快遞(假)", "購買滿$600包郵，$600以下運貨到付"],
              noti: "指示會顯示於結帳頁面!",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "更新", class: "update" },
              ],
            },
            {
              isOpen: false,
              title: "修改取貨方式",
              icon: "fas fa-times",
              label: ["顯示名稱", "取貨指示"],
              content: ["慢慢快遞(假)", "購買滿$1000包郵，$1000以下運貨到付"],
              noti: "指示會顯示於結帳頁面!",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "更新", class: "update" },
              ],
            },
          ],
          addPop: {
            isOpen: false,
            title: "新增取貨方式",
            icon: "fas fa-times",
            label: ["顯示名稱", "取貨指示"],
            content: ["", ""],
            noti: "指示會顯示於結帳頁面!",
            buttons: [
              { name: "取消", class: "cancel" },
              { name: "新增", class: "create" },
            ],
          },
        };
      },
    },
    payment: {
      template: `<div id="payment" class="clearfix">
                  <div class="col-12 row1">
                    <h3>{{title}}</h3>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t.name}}</th>
                      </tr>
                      <tr class="payment" v-for="(p,idx) in payments">
                        <td>{{p.name}}</td>
                        <td>{{p.claim}}</td>
                        <td>
                          <span :class="p.statusO.class" v-if="p.status">{{p.statusO.name}}</span>
                          <span :class="p.statusC.class" v-else>{{p.statusC.name}}</span>
                        </td>
                        <td>
                          <a href="javascript:;">
                            <i :class="p.actions[0].icon" @click="editPop[idx].isOpen = true"/>
                            <span>{{p.actions[0].action}}</span>
                          </a>
                          <a href="javascript:;">
                            <i :class="p.actions[1].icon" @click="payments[idx].status = !payments[idx].status"/>
                            <span>{{p.actions[1].action}}</span>
                          </a>
                          <a href="javascript:;">
                            <i :class="p.actions[2].icon" @click="delPop[idx].isOpen = true" />
                            <span>{{p.actions[2].action}}</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="popup-background del" :class="{'active':d.isOpen}" @click.self="d.isOpen = false" v-for="d in delPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <i :class="d.icon"/>
                      </div>
                      <div class="col-12 modal-body">
                        <p>你確定刪除"{{d.name}}"?</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="d.buttons[0].class" @click="d.isOpen = false">{{d.buttons[0].name}}</a>
                        <a href="javascript:;" :class="d.buttons[1].class">{{d.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background payment-edit" :class="{'active':e.isOpen}" @click.self="e.isOpen = false" v-for="e in editPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{e.title}}</h2>
                        <button @click="e.isOpen = false"><i :class="e.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{e.label[0]}}</h4>
                        <input type="text" v-model="e.content[0]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{e.label[1]}}</h4>
                        <input type="text" v-model="e.content[1]">
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="e.buttons[0].class" @click="e.isOpen = false">{{e.buttons[0].name}}</a>
                        <a href="javascript:;" :class="e.buttons[1].class">{{e.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background payment-add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{addPop.title}}</h2>
                        <button @click="addPop.isOpen = false"><i :class="addPop.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[0]}}</h4>
                        <input type="text" v-model="addPop.content[0]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[1]}}</h4>
                        <input type="text" v-model="addPop.content[1]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[2]}}</h4>
                        <input type="text" v-model="addPop.content[2]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[3]}}</h4>
                        <input type="text" v-model="addPop.content[3]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[4]}}</h4>
                        <input type="text" v-model="addPop.content[4]">
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "設定你接受的付款方式",
          button: { name: "新增", icon: "fas fa-plus" },
          thead: [
            { name: "支付方式" },
            { name: "支付指示" },
            { name: "狀態" },
            { name: "操作" },
          ],
          payments: [
            {
              name: "銀行轉帳(假)",
              claim: "請於下單後3天內轉帳至銀行戶口",
              statusO: { name: "開啟中", class: "open" },
              statusC: { name: "已停用", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
            {
              name: "超商付款(假)",
              claim: "於各大超商，進行繳款付帳動作",
              statusO: { name: "開啟中", class: "open" },
              statusC: { name: "已停用", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "編輯" },
                { icon: "fas fa-ban", action: "啟用/停用" },
                { icon: "fas fa-trash-alt", action: "刪除" },
              ],
            },
          ],
          delPop: [
            {
              isOpen: false,
              name: "銀行轉帳(假)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "刪除", class: "delete" },
              ],
            },
            {
              isOpen: false,
              name: "Convenience Store Payment(假)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "刪除", class: "delete" },
              ],
            },
          ],
          editPop: [
            {
              isOpen: false,
              title: "修改支付方式",
              icon: "fas fa-times",
              label: [
                "顯示名稱",
                "收款帳戶",
                "收款帳戶號碼",
                "收款人名稱",
                "付款指示",
              ],
              content: [
                "銀行轉帳(假)",
                "好存銀行",
                "12344-112323-1111",
                "Jacko",
                "請於下單後3天內轉帳至銀行戶口",
              ],
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "更新", class: "update" },
              ],
            },
            {
              isOpen: false,
              title: "修改支付方式",
              icon: "fas fa-times",
              label: [
                "顯示名稱",
                "收款帳戶",
                "收款帳戶號碼",
                "收款人名稱",
                "付款指示",
              ],
              content: [
                "超商付款(假)",
                "好存銀行",
                "12344-112323-1111",
                "Jacko",
                "於各大超商，進行繳款付帳動作",
              ],
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "更新", class: "update" },
              ],
            },
          ],
          addPop: {
            isOpen: false,
            title: "新增支付方式",
            icon: "fas fa-times",
            label: [
              "顯示名稱",
              "收款帳戶",
              "收款帳戶號碼",
              "收款人名稱",
              "付款指示",
            ],
            content: ["", "", "", "", ""],
            buttons: [
              { name: "取消", class: "cancel" },
              { name: "新增", class: "create" },
            ],
          },
        };
      },
    },
    productsettings: {
      template: `<div id="productsettings" class="clearfix">
                  <div class="col-12">
                    <h4>{{title}}</h4>
                  </div>
                  <div class="col-12 setting" v-for="(s,idx) in settings" :class="[s.classname,{'active':s.isOpen}]">
                    <div class="card-title" @click="s.isOpen = !s.isOpen">
                      <p>
                        <span :class="s.statusO.class" v-if="s.status">{{s.statusO.name}}</span>
                        <span :class="s.statusC.class" v-else>{{s.statusC.name}}</span>
                        {{s.item}}
                      </p>
                      <a href="javascript:;">
                            <i :class="s.actionicon"/>
                            <span>{{s.actionname}}</span>
                      </a>
                    </div>
                    <div class="card-body" v-if="s.isOpen === true">
                      <label class="checkbox">
                        <input type="checkbox" v-model="s.status">
                        <span class="knob"/>
                        <span class="bg"/>
                      </label>
                      <label class="content">{{s.item}}</label>
                      <button @click="s.isOpen = false;">{{s.button}}</button>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          open: false,
          title: "以下設定會顯示於商品詳情頁面內：",
          settings: [
            {
              isOpen: false,
              classname: "item1",
              statusO: { name: "開啟中", class: "open" },
              statusC: { name: "已停用", class: "close" },
              status: false,
              item: "顯示商品庫存數量",
              actionname: "編輯",
              actionicon: "fas fa-edit",
              button: "關閉",
            },
            {
              isOpen: false,
              classname: "item2",
              statusO: { name: "開啟中", class: "open" },
              statusC: { name: "已停用", class: "close" },
              status: false,
              item: "顯示已售商品數量",
              actionname: "編輯",
              actionicon: "fas fa-edit",
              button: "關閉",
            },
            {
              isOpen: false,
              classname: "item3",
              statusO: { name: "開啟中", class: "open" },
              statusC: { name: "已停用", class: "close" },
              status: false,
              item: "購買須知",
              actionname: "編輯",
              actionicon: "fas fa-edit",
              button: "關閉",
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
    changeTab(idx) {
      let l = this.tabs.length;
      for (let i = 0; i < l; i++) {
        this.tabs[i].active = false;
      }
      this.tabs[idx].active = true;
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
                  <div class="col-12">
                    <div class="button">
                      <button @click="changeView(t.c_name);changeTab(idx);" :class="{'active': t.active}" v-for="(t,idx) in tabs" :key="t.name"><i :class="t.icon"></i>{{t.name}}</button>
                    </div>
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
        {
          c_name: "admin",
          name: "管理者",
          icon: "fas fa-user-friends",
          active: true,
        },
        {
          c_name: "helper",
          name: "工作人員",
          icon: "fas fa-user",
          active: false,
        },
      ],
    };
  },
  components: {
    admin: {
      template: `<div id="admin">
                  <div class="col-12 row1">
                    <h1>{{title}}</h1>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t}}</th>
                      </tr>
                      <tr v-for="(a,idx) in admins">
                        <td><i :class="a.icon"><span class="name">{{a.name}}</span><span :class="a.level[1]">{{a.level[0]}}</span></i></td>
                        <td><span :class="a.status[1]">{{a.status[0]}}</span></td>
                        <td> 
                          <a href="javascript:;" @click="delPop[idx].isOpen = true">
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
                  <div class="popup-background del" :class="{'active':d.isOpen}" @click.self="d.isOpen = false" v-for="d in delPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <i :class="d.icon"/>
                      </div>
                      <div class="col-12 modal-body">
                        <p>你確定刪除"{{d.name}}"?</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="d.buttons[0].class" @click="d.isOpen = false">{{d.buttons[0].name}}</a>
                        <a href="javascript:;" :class="d.buttons[1].class">{{d.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background admin-add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{addPop.title}}</h2>
                        <button @click="addPop.isOpen = false"><i :class="addPop.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[0]}}</h4>
                        <input type="text" v-model="addPop.content[0]">
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                      </div>
                    </div>
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
              level: [null, "none"],
              status: ["等待中", "wait"],
              action: "刪除",
              a_icon: "fas fa-trash-alt",
            },
            {
              icon: "fas fa-user-circle",
              name: "Jacko",
              level: ["擁有者", "level"],
              status: ["啟用", "active"],
              action: null,
              a_icon: "none",
            },
          ],
          pages: [10, 20, 50, 100],
          icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
          delPop: [
            {
              isOpen: false,
              name: "新管理者",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "取消", class: "cancel" },
                { name: "刪除", class: "delete" },
              ],
            },
          ],
          addPop: {
            isOpen: false,
            title: "新增管理者",
            icon: "fas fa-times",
            label: ["管理者名稱"],
            content: [""],
            buttons: [
              { name: "取消", class: "cancel" },
              { name: "新增", class: "create" },
            ],
          },
        };
      },
    },
    helper: {
      template: `<div id="helper">
                  <div class="col-12 row1">
                    <h1>{{title}}</h1>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t.name}}</th>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-c">{{result}}</td>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-r">每頁行數: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                  <div class="popup-background helper-add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{addPop.title}}</h2>
                        <button @click="addPop.isOpen = false"><i :class="addPop.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[0]}}</h4>
                        <input type="text" v-model="addPop.content[0]">
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "工作人員",
          button: { name: "新增", icon: "fas fa-plus" },
          thead: [{ name: "帳號" }, { name: "狀態" }, { name: "操作" }],
          result: "無符合資料",
          pages: [10, 20, 50, 100],
          icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
          addPop: {
            isOpen: false,
            title: "新增工作人員",
            icon: "fas fa-times",
            label: ["工作人員名稱"],
            content: [""],
            buttons: [
              { name: "取消", class: "cancel" },
              { name: "新增", class: "create" },
            ],
          },
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
    changeTab(idx) {
      let l = this.tabs.length;
      for (let i = 0; i < l; i++) {
        this.tabs[i].active = false;
      }
      this.tabs[idx].active = true;
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
Vue.component("side-menu-en-tag", {
  template: `<div id="side-menu" :class="{'active':isOpen}">
                <div class="side-menu-header">
                    <i :class="i" v-for="i in header.icons"></i>
                    <p>{{header.name}}</p>
                </div>
                <div class="side-menu-contents">
                    <div class="side-menu-section" v-for="(b,idx1) in blocks">
                        <p>{{b.name}}</p>
                        <a href="javascript:;" :key="idx2" v-for="(st,idx2) in b.subIcons" :class="{'active':st.active}">
                          <i :class="st.icon" @click="changeView(st.c_name);changeTag(idx1,idx2)">
                            <span>
                              {{st.title}}
                            </span>
                          </i>
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
          name: "Operate",
          subIcons: [
            {
              title: "Home",
              icon: "fas fa-house-user",
              c_name: "indexEnTag",
              active: true,
            },
            {
              title: "Products",
              icon: "fas fa-box-open",
              c_name: "productsEnTag",
              active: false,
            },
            {
              title: "Orders",
              icon: "fas fa-folder",
              c_name: "ordersEnTag",
              active: false,
            },
            {
              title: "Promo Codes",
              icon: "fas fa-star-of-david",
              c_name: "promoCodeEnTag",
              active: false,
            },
          ],
        },
        {
          name: "Manage",
          subIcons: [
            {
              title: "Settings",
              icon: "fas fa-wrench",
              c_name: "shopSettingsEnTag",
              active: false,
            },
            {
              title: "Subscription",
              icon: "fas fa-star",
              c_name: "subscriptionPlanEnTag",
              active: false,
            },
            {
              title: "Team",
              icon: "fas fa-user-cog",
              c_name: "teammateEnTag",
              active: false,
            },
          ],
        },
        {
          name: "Notify",
          subIcons: [
            {
              title: "Messages",
              icon: "fas fa-bell",
              c_name: "notificationsEnTag",
              active: false,
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
    changeTag(idx1, idx2) {
      let l = this.blocks.length;
      for (let i = 0; i < l; i++) {
        let z = this.blocks[i].subIcons.length;
        for (let x = 0; x < z; x++) {
          this.blocks[i].subIcons[x].active = false;
        }
      }
      this.blocks[idx1].subIcons[idx2].active = true;
    },
  },
  mounted() {
    this.open();
    this.closeMenu();
  },
});
Vue.component("nav-en-tag", {
  template: `<div id="nav">
                <div class="wrapper">
                  <div class="left-nav" :class="{'active':isOpenSideMenu}">
                      <a href="javascript:;" @click="openMenu"><i :class="leftIcons"></i></a>
                  </div>
                  <div class="right-nav">
                      <a href="javascript:;" @click=changeView(i.c_name) v-for="(i,idx) in rightIcons1" :key="idx">
                        <i :class="i.icon"></i>
                        <span>{{i.name}}</span>
                      </a>
                      <a href="javascript:;" v-for="(i,idx) in rightIcons2" @click="openLang(idx),openLogout(idx)"><i :class="i.icon"></i><span>{{i.name}}</span></a>
                      <div class="lang" :class="{'active': isOpenLangs}" ref="lang">
                          <p v-for="(l,idx) in langs" :class="{'active': l.active}" @click="changeLang(idx,l.abbrr)"><span>{{l.abbrr}}</span>{{l.name}}</p>
                      </div>
                      <div class="logout" :class="{'active': isLogout}" ref="logout">
                          <p>{{logout}}</p>
                      </div>
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
          name: "Help Center",
          icon: "fas fa-question-circle",
          c_name: "helpCenterEnTag",
        },
        {
          name: "Main Menu",
          icon: "fas fa-window-restore",
          c_name: "mainDirectoryEnTag",
        },
      ],
      rightIcons2: [
        { name: "Display Languages", icon: "fas fa-language" },
        { name: "Logout", icon: "fas fa-user-circle" },
      ],
      langs: [
        { abbrr: "Zh", name: "Zh-hunt", active: false },
        { abbrr: "En", name: "English", active: true },
      ],
      logout: "Logout",
    };
  },
  methods: {
    openLang(idx) {
      if (idx !== 0) {
        return false;
      } else {
        this.isOpenLangs = !this.isOpenLangs;
      }
    },
    closeSelect() {
      if (this.isOpenLangs === true || this.isLogout === true) {
        this.isOpenLangs = false;
        this.isLogout = false;
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
        this.isLogout = !this.isLogout;
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
    changeLang(idx, a) {
      let l = this.langs.length;
      for (let i = 0; i < l; i++) {
        this.langs[i].active = false;
      }
      this.langs[idx].active = true;
      this.closeSelect();
      vm.$emit("lang", a);
    },
  },
  mounted() {
    this.closeMenu();
  },
  created() {
    let self = this;
    window.addEventListener("click", (e) => {
      if (!self.$el.contains(e.target)) {
        this.isOpenLangs = false;
      }
      if (!self.$el.contains(e.target)) {
        this.isLogout = false;
      }
    });
  },
});
Vue.component("footer-en-tag", {
  template: `<div id="footer" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="col-12">
                  <p>JCart <i class="far fa-copyright"></i> {{date}}</p>
                </div>
              </div>
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
const indexEnTag = Vue.component("index-en-tag", {
  template: `<div id="index" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-12">
                    <div class="col-11 col-md-5 col-lg-3" v-for="c in cards">
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
      title: "Welcome to your JCart Shop!!",
      cards: [
        { item: "New Users", currency: null, num: "0" },
        { item: "Active Users", currency: null, num: "0" },
        { item: "Total Users", currency: null, num: "0" },
        { item: "New Orders", currency: null, num: "0" },
        { item: "Total Orders", currency: null, num: "0" },
        { item: "Revenue last 7 days", currency: "TWD", num: "0.00" },
        { item: "Revenue last month", currency: "TWD", num: "0.00" },
        { item: "Total Revenue", currency: "TWD", num: "0.00" },
        { item: "Purchase Conversion Rate", currency: null, num: "0" },
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
const mainDirectoryEnTag = Vue.component("main-directory-en-tag", {
  template: `<div id="main-directory" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-6 col-lg-2" :class="a.order" v-for="a in accounts">
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
        { user: "fas fa-plus", content: "Create JCart Shop", order: "a" },
        { user: null, content: "JCart test", order: "b" },
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
const helpCenterEnTag = Vue.component("help-center-en-tag", {
  template: `<div id="help-center" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12" v-for="s in sections">
                    <a href="javascript:;">
                      <div class="col-11 col-lg-2">
                        <i :class="s.icon"/>
                      </div>
                      <div class="col-10 col-lg-10">
                        <h3>{{s.title}}</h3>
                        <p>{{s.content}}</p>
                        <div class="col-12 inner">
                          <div>
                            <i :class="u" v-for="u in s.usersicons"></i>
                          </div>
                          <div>
                            <p>There are{{s.artnum}}article(s) in this series</p>
                            <p>Author: {{s.author}}</p>
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
          title: "What is JCart?",
          content:
            "Want to know what JCart is? Is it suitable for you to use? How much does it cost? Answer you all here",
          usersicons: ["fas fa-user-circle"],
          artnum: 13,
          author: "Jacko",
        },
        {
          icon: "fas fa-cogs",
          title: "Get started-build?",
          content:
            "Simple 3 steps to open a store: display,transform and achievements !!",
          usersicons: ["fas fa-user-circle"],
          artnum: 5,
          author: "Jacko",
        },
        {
          icon: "fas fa-book-open",
          title: "Shopkeepers must learn secrets-function manual?",
          content:
            "JCart has many convenient functions to put on the shelf easily, be sure to come in and read before starting !!",
          usersicons: ["fas fa-user-circle", "fas fa-user-circle"],
          artnum: 13,
          author: "Jacko and Jessica",
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
const notificationsEnTag = Vue.component("notifications-en-tag", {
  template: `<div id="noti" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-12">
                    <p>{{content}}</p>
                    <button disabled>{{button}}</button>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "Messages",
      content: "The notification will be sent via your JCart.",
      button: "Turn on notifications",
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
const ordersEnTag = Vue.component("orders-en-tag", {
  template: `<div id="orders" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12">
                    <h1>{{title}}</h1>
                  </div>
                  <div class="col-12 row1">
                    <div>
                      <i :class="searchIcons"/>
                      <input type="text" :placeholder="placeholder">
                    </div>
                    <button @click="filterPop.isOpen = !filterPop.isOpen">
                      <i :class="filter.icon"></i>{{filter.name}}
                    </button>
                    <div class="filterPop" :class="{'active':filterPop.isOpen}">
                      <h3>{{filterPop.title}}</h3>
                      <label>{{filterPop.label}}</label>
                      <select><option v-for="s in filterPop.selects">{{s}}</option></select>
                      <button @click.self="filterPop.isOpen = false">{{filterPop.button}}</button>
                    </div>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t}}</th>
                      </tr>
                      <tr>
                        <td colspan="7" class="txt-c">{{result}}</td>
                      </tr>
                      <tr>
                        <td colspan="7" class="txt-r">Rows per page: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "Order List",
      searchIcons: "fas fa-search",
      placeholder: "ID / Name / Phone",
      filter: { name: "FILTER", icon: "fas fa-filter" },
      filterPop: {
        isOpen: false,
        title: "Filter by order status",
        label: "Select order status",
        selects: [
          "Pending Payment",
          "Pending Payment Confirmation",
          "Payment Success",
          "All Shipped",
          "Partial Delivered",
          "All Delivered",
          "Cancel Oreder",
        ],
        button: "DONE",
      },
      thead: [
        "Order ID",
        "Customer Name",
        "Shipping Methods",
        "Order Status",
        "Amount",
        "Date Created",
        "Action",
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
const productsEnTag = Vue.component("products-en-tag", {
  template: `<div id="products" :class="{'active':isOpen}">
                <div class="wrapper">
                <div class="container">
                  <div class="col-12 row1">
                    <h1>{{title}}</h1>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t.name}}</th>
                      </tr>
                      <tr class="product">
                        <td>{{products[0]}}</td>
                        <td><img :src="products[1]" class="image"></td>
                        <td><p v-for="p in products[2]">{{p}}</p></td>
                        <td>{{products[3]}}</td>
                        <td>{{products[4]}}</td>
                        <td><select><option v-for="p in products[5]">{{p}}</option></select></td>
                        <td>
                          <a href="javascript:;"  @click="editPop.isOpen = true">
                            <i :class="products[6][0].icon"/>
                            <span>{{products[6][0].action}}</span>
                          </a>
                          <a href="javascript:;" @click="delPop.isOpen = true">
                            <i :class="products[6][1].icon"/>
                            <span>{{products[6][1].action}}</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="7" class="txt-r">Rows per page: <select><option v-for="r in rows" :value="r">{{r}}</option></select>pages: <select><option v-for="p in pages" :value="p">{{p}}</option></select> 1/1 of 1 <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="popup-background add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                  <div class="popup">
                    <div class="col-12 modal-head">
                      <h2>{{addPop.title}}</h2>
                      <select><option v-for="p in products[5]">{{p}}</option></select>
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{addPop.items[0]}}</h4>
                      <input type="text">
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{addPop.items[1]}}</h4>
                      <input type="file">
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{addPop.items[2]}}</h4>
                      <table>
                        <tr>
                          <th v-for="t in addPop.tableHead">{{t}}</th>
                        </tr>
                        <tr v-for="v in addPop.variants">
                          <td><input type="text" v-model="v.name" class="variants"></td>
                          <td><input type="number" v-model="v.price" class="variants"></td>
                          <td class="amount"><input type="number" v-model="v.remain" class="remain"><span>/</span><input type="number" v-model="v.total"></td>
                        </tr>
                      </table>
                    </div>
                    <div class="col-12 modal-footer">
                      <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                      <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                    </div>
                  </div>
                </div>
                <div class="popup-background edit" :class="{'active':editPop.isOpen}" @click.self="editPop.isOpen = false">
                  <div class="popup">
                    <div class="col-12 modal-head">
                      <h2>{{editPop.title}}</h2>
                      <select><option v-for="p in products[5]">{{p}}</option></select>
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{editPop.items[0]}}</h4>
                      <input type="text" v-model="products[0]">
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{editPop.items[1]}}</h4>
                      <img :src="editPop.imgpath">
                    </div>
                    <div class="col-12 modal-body">
                      <h4>{{editPop.items[2]}}</h4>
                      <table>
                        <tr>
                          <th v-for="t in editPop.tableHead">{{t}}</th>
                        </tr>
                        <tr v-for="v in editPop.variants">
                          <td><input type="text" v-model="v.name" class="variants"></td>
                          <td><input type="number" v-model="v.price" class="variants"></td>
                          <td class="amount"><input type="number" v-model="v.remain" class="remain"><span>/</span><input type="number" v-model="v.total"></td>
                        </tr>
                      </table>
                    </div>
                    <div class="col-12 modal-footer">
                      <a href="javascript:;" :class="editPop.buttons[0].class" @click="editPop.isOpen = false">{{editPop.buttons[0].name}}</a>
                      <a href="javascript:;" :class="editPop.buttons[1].class">{{editPop.buttons[1].name}}</a>
                    </div>
                  </div>
                </div>
                <div class="popup-background del" :class="{'active':delPop.isOpen}" @click.self="delPop.isOpen = false">
                  <div class="popup">
                    <div class="col-12 modal-head">
                      <i :class="delPop.icon"/>
                    </div>
                    <div class="col-12 modal-body">
                      <p>Are you sure to delete  " {{products[0]}} " ?</p>
                    </div>
                    <div class="col-12 modal-footer">
                      <a href="javascript:;" :class="delPop.buttons[0].class" @click="delPop.isOpen = false">{{delPop.buttons[0].name}}</a>
                      <a href="javascript:;" :class="delPop.buttons[1].class">{{delPop.buttons[1].name}}</a>
                    </div>
                  </div>
                </div>   
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "All Products",
      button: { name: "ADD", icon: "fas fa-plus" },
      thead: [
        { name: "Product Name" },
        { name: "Photo" },
        { name: "Variants" },
        { name: "Inventory" },
        { name: "Sold" },
        { name: "Status" },
        { name: "Action" },
      ],
      products: [
        "Demo Product",
        "./images/cart.jpg",
        ["Red $100[10]", "Blue $100[10]", "Yellow $100[10]"],
        "30",
        "0",
        ["On sale", "Remove"],
        [
          { action: "Edit", icon: "fas fa-pen" },
          { action: "Delete", icon: "fas fa-trash-alt" },
        ],
      ],
      rows: [10, 20, 30, 40],
      pages: [1],
      icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
      addPop: {
        isOpen: false,
        title: "Create Products",
        items: ["Product Name", "Product Images", "Variants"],
        tableHead: ["Variants(e.g. size/color)", "Price", "Remain/Total"],
        variants: [{ name: "", price: 0, remain: 0, total: 0 }],
        buttons: [
          { name: "Cancel", class: "cancel" },
          { name: "create", class: "create" },
        ],
      },
      editPop: {
        isOpen: false,
        title: "Update Product",
        imgpath: "./images/cart.jpg",
        items: ["Product Name", "Product Images", "Variants"],
        tableHead: ["Variants(e.g. size/color)", "Price", "Remain/Total"],
        variants: [
          { name: "Red", price: 100, remain: 10, total: 10 },
          { name: "Blue", price: 100, remain: 10, total: 10 },
          { name: "Yellow", price: 100, remain: 10, total: 10 },
        ],
        buttons: [
          { name: "Cancel", class: "cancel" },
          { name: "Update", class: "update" },
        ],
      },
      delPop: {
        isOpen: false,
        icon: "fas fa-exclamation",
        buttons: [
          { name: "Cancel", class: "cancel" },
          { name: "Delete", class: "delete" },
        ],
      },
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
const promoCodeEnTag = Vue.component("promo-code-en-tag", {
  template: `<div id="promo-code" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12 row1">
                    <h1>{{title}}</h1>
                    <button @click="promoCodeAddPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t}}</th>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-c">{{result}}</td>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-r">Rows per pages: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="popup-background promo-code-add" :class="{'active':promoCodeAddPop.isOpen}" @click.self="promoCodeAddPop.isOpen = false">
                  <div class="popup">
                    <div class="col-12 modal-head">
                      <h2>{{promoCodeAddPop.title}}</h2>
                      <button @click="promoCodeAddPop.isOpen = false"><i :class="promoCodeAddPop.icon"></i></button>
                    </div>
                    <div class="col-12 modal-body">
                      <div class="col-12 col-md-6">
                        <h4>{{promoCodeAddPop.items[0]}}</h4>
                        <label>{{promoCodeAddPop.subitems[0]}}</label>
                        <input type="text">
                      </div>
                      <div class="col-12 col-md-6 times">
                        <label>{{promoCodeAddPop.subitems[1]}}</label>
                        <input type="number">
                      </div>
                      <div class="col-12 col-md-6">
                        <h4>{{promoCodeAddPop.items[1]}}</h4>
                        <input type="radio" checked="true">
                        <label>{{promoCodeAddPop.date}}</label>
                      </div>
                      <div class="col-12 col-md-3" v-for="v in promoCodeAddPop.validDate">
                        <label>{{v}}</label>
                        <input type="date">
                      </div>
                      <div class="col-6">
                        <input type="radio" name="discount" :value="promoCodeAddPop.discount[0]" v-model="promoCodeAddPop.picked" :id="promoCodeAddPop.discount[0]">
                        <label :for="promoCodeAddPop.discount[0]">{{promoCodeAddPop.discount[0]}}</label>
                        <input type="radio" name="discount" :value="promoCodeAddPop.discount[1]" v-model="promoCodeAddPop.picked" :id="promoCodeAddPop.discount[1]">
                        <label :for="promoCodeAddPop.discount[1]">{{promoCodeAddPop.discount[1]}}</label>
                      </div>
                      <div class="col-12 col-md-6" v-if="promoCodeAddPop.picked === '按金額折扣'">
                        <label>{{promoCodeAddPop.subdiscount[0]}}</label>
                        <span class="dollar">$</span><input type="number" class="money">
                      </div>
                      <div class="col-12 col-md-6" v-else>
                        <label>{{promoCodeAddPop.subdiscount[1]}}</label>
                        <input type="number"><span class="percent">%</span>
                      </div>
                      <div class="col-12">
                        <h4>{{promoCodeAddPop.items[2]}}</h4>
                        <select>
                          <option v-for="l in promoCodeAddPop.limits" :value="l">{{l}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 modal-footer">
                      <a href="javascript:;" :class="promoCodeAddPop.buttons[0].class" @click="promoCodeAddPop.isOpen = false">{{promoCodeAddPop.buttons[0].name}}</a>
                      <a href="javascript:;" :class="promoCodeAddPop.buttons[1].class">{{promoCodeAddPop.buttons[1].name}}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "Promo Code",
      button: { name: "ADD", icon: "fas fa-plus" },
      thead: ["Name", "Discount", "Tyoe", "Redeemed/Limit", "Status", "Action"],
      result: "No data available",
      pages: [10, 20, 50, 100],
      icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
      promoCodeAddPop: {
        isOpen: false,
        title: "Promo Code Settings",
        icon: "fas fa-times",
        items: [
          "Create Promo Code",
          "Active Date",
          "Discount Type and Amount",
          "Applies to",
        ],
        subitems: ["Code Name", "Max. number of times can be used"],
        date: "Date Range",
        validDate: ["Start Date", "End Date"],
        discount: ["Fixed Amount Discount", "Percentage Discount"],
        subdiscount: ["Discounted Amount", "Discounted Percentage"],
        picked: "Fixed Amount Discount",
        limits: [
          "All products",
          "Selected products only",
          "Regular price products",
          "Minimum purchase amount",
        ],
        buttons: [
          { name: "Cancel", class: "cancel" },
          { name: "Create", class: "create" },
        ],
      },
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
const subscriptionPlanEnTag = Vue.component("subscription-plan-en-tag", {
  template: `<div id="sub-plan" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12">
                    <div class="button">
                      <button @click="changeView(t.c_name);changeTab(idx);" :class="{'active': t.active}" v-for="(t,idx) in tabs" :key="t.name"><i :class="t.icon"></i>{{t.name}}</button>
                    </div>
                    <component :is="view"/>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "PlAN",
      view: "pricing",
      tabs: [
        {
          c_name: "pricing",
          name: "PLAN",
          icon: "fas fa-star",
          active: true,
        },
        {
          c_name: "record",
          name: "PAYMENT RECORDS",
          icon: "fas fa-file-alt",
          active: false,
        },
      ],
    };
  },
  components: {
    pricing: {
      template: `<div id="pricing">
                  <h1>{{title}}</h1>
                  <div class="col-12 col-lg-3 free">
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
                  <div class="col-12 col-lg-8 pro">
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
                    <div class="card-footer2 clearfix">
                      <button class="levelup" @click="planUpdatePop.isOpen = true">{{button}}</button>
                    </div>
                  </div>
                  <div class="popup-background plan-update" :class="{'active':planUpdatePop.isOpen}" @click.self="planUpdatePop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <i :class="planUpdatePop.icon"/>
                      </div>
                      <div class="col-12 modal-body">
                        <p>{{planUpdatePop.content}}</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="planUpdatePop.buttons[0].class" @click="planUpdatePop.isOpen = false">{{planUpdatePop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="planUpdatePop.buttons[1].class">{{planUpdatePop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div> 
                </div>`,
      data() {
        return {
          title: "Plan",
          free_t: "Free Plan",
          free_a: "Cureent Plan",
          free_st: "Get your business up and running",
          free_c: "USD",
          free_m: "0",
          free_d: "/month",
          free_content: ["Active user limit: ", "remaining active users quota"],
          free_maxnum: "200 users",
          free_maxnum_h: "200",
          pro_t: "Pro Plan",
          pro_a: null,
          pro_st: "Level up with features that grow with you",
          pro_c: "USD",
          pro_m: "5",
          pro_d: "/month",
          pro_content:
            "Includes all Free Plan features and the following advanced features",
          pro_features: [
            {
              icon: "fas fa-check",
              content: "A.I. powered customer assistance request notification",
            },
            {
              icon: "fas fa-check",
              content: "Follow up notifications after placing orders",
            },
            { icon: "fas fa-check", content: "Priority support" },
            {
              icon: "fas fa-check",
              content: "Multiple shop manager and shop assistant accounts",
            },
            { icon: "fas fa-check", content: "Recover abandoned carts" },
            { icon: "fas fa-check", content: "Incentivize return purchase" },
          ],
          button: "UPGRADE PLAN",
          planUpdatePop: {
            isOpen: false,
            icon: "fas fa-exclamation",
            content:
              "You will be directly to an external site for the checkout process and return to MyCart shortly after . Please provide the credit card info for authorizing monthly subscription fee. Recurring fee will be automatically charged from your credit card on a monthly basis based on the number of active users.",
            buttons: [
              { name: "Back", class: "cancel" },
              { name: "Continue", class: "continue" },
            ],
          },
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
                      <th v-for="t in thead">{{t.name}}</th>
                    </tr>
                    <tr>
                      <td colspan="5" class="txt-c">{{result2}}</td>
                    </tr>
                  </table>
                </div>`,
      data() {
        return {
          tabTitle1: "Payment Method",
          result1: "No payment method",
          tabTitle2: "Payment Rcords",
          thead: [
            { name: "Period" },
            { name: "Amount" },
            { name: "Billing Date" },
            { name: "Status" },
            { name: "Rceipt" },
          ],
          result2: "No payment method",
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
    changeTab(idx) {
      let l = this.tabs.length;
      for (let i = 0; i < l; i++) {
        this.tabs[i].active = false;
      }
      this.tabs[idx].active = true;
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const shopSettingsEnTag = Vue.component("shop-settings-en-tag", {
  template: `<div id="shop" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12">
                    <div class="button">
                      <button @click="changeView(t.c_name);changeTab(idx);" :class="{'active': t.active}" v-for="(t,idx) in tabs" :key="t.name"><i :class="t.icon"></i>{{t.name}}</button>
                    </div>
                    <component :is="view"/>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      view: "basic_info",
      tabs: [
        {
          c_name: "basic_info",
          name: "GENERAL SETTINGS",
          icon: "fas fa-cog",
          active: true,
        },
        {
          c_name: "shipping",
          name: "SHIPPING　METHOD",
          icon: "fas fa-truck",
          active: false,
        },
        {
          c_name: "payment",
          name: "PAYMENT METHOD",
          icon: "fas fa-money-check-alt",
          active: false,
        },
        {
          c_name: "productsettings",
          name: "PRODUCT DETAILS",
          icon: "fas fa-cogs",
          active: false,
        },
      ],
    };
  },
  components: {
    basic_info: {
      template: `<div id="basic_info" class="clearfix">
                  <div class="col-12">
                    <div class="card-title">
                      <h2>{{title}}</h2>
                    </div>
                    <div class="card-body">
                      <label>{{shop_label[0]}}</label>
                      <input type="text" v-model="shop_name">
                      <label>{{shop_label[1]}}</label>
                      <input type="text" v-model="shop_mail">
                      <label>{{shop_label[2]}}</label>
                      <select>
                        <option value="">--Select--</option>
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
          title: "Shop Settings",
          shop_label: ["Shop Name", "Shop Email", "Select Category"],
          shop_name: "JCart test",
          shop_mail: "j@gmail.com",
          shop_type: [
            "Animals and Pet Supplies",
            "Health and Beauty",
            "Electronics",
          ],
          button: "UPDATE",
        };
      },
    },
    shipping: {
      template: `<div id="shipping" class="clearfix">
                  <div class="col-12 row1">
                    <h3>{{title}}</h3>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t.name}}</th>
                      </tr>
                      <tr class="shipping" v-for="(s,idx) in shippings">
                        <td>{{s.name}}</td>
                        <td>{{s.claim}}</td>
                        <td >
                          <span :class="s.statusO.class" v-if="s.status">{{s.statusO.name}}</span>
                          <span :class="s.statusC.class" v-else>{{s.statusC.name}}</span>
                        </td>
                        <td>
                          <a href="javascript:;">
                            <i :class="s.actions[0].icon" @click="editPop[idx].isOpen = true"/>
                            <span>{{s.actions[0].action}}</span>
                          </a>
                          <a href="javascript:;">
                            <i :class="s.actions[1].icon" @click="shippings[idx].status = !shippings[idx].status"/>
                            <span>{{s.actions[1].action}}</span>
                          </a>
                          <a href="javascript:;">
                            <i :class="s.actions[2].icon" @click="delPop[idx].isOpen = true" />
                            <span>{{s.actions[2].action}}</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="popup-background del" :class="{'active':d.isOpen}" @click.self="d.isOpen = false" v-for="d in delPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <i :class="d.icon"/>
                      </div>
                      <div class="col-12 modal-body">
                        <p>Are you sure to delete "{{d.name}}"?</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="d.buttons[0].class" @click="d.isOpen = false">{{d.buttons[0].name}}</a>
                        <a href="javascript:;" :class="d.buttons[1].class">{{d.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background shipping-edit" :class="{'active':e.isOpen}" @click.self="e.isOpen = false" v-for="e in editPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{e.title}}</h2>
                        <button @click="e.isOpen = false"><i :class="e.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{e.label[0]}}</h4>
                        <input type="text" v-model="e.content[0]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{e.label[1]}}</h4>
                        <input type="text" v-model="e.content[1]">
                        <p>{{e.noti}}</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="e.buttons[0].class" @click="e.isOpen = false">{{e.buttons[0].name}}</a>
                        <a href="javascript:;" :class="e.buttons[1].class">{{e.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background shipping-add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{addPop.title}}</h2>
                        <button @click="addPop.isOpen = false"><i :class="addPop.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[0]}}</h4>
                        <input type="text" v-model="addPop.content[0]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[1]}}</h4>
                        <input type="text" v-model="addPop.content[1]">
                        <p>{{addPop.noti}}</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "Setup Shipping Methods",
          button: { name: "ADD", icon: "fas fa-plus" },
          thead: [
            { name: "Shipping Method" },
            { name: "Shipping Instruction" },
            { name: "Status" },
            { name: "Action" },
          ],
          shippings: [
            {
              name: "DBQ express delivery(Fake)",
              claim:
                "Free shipping on purchases over $ 300, delivery on delivery under $ 300",
              statusO: { name: "Active", class: "open" },
              statusC: { name: "Inactive", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "Edit" },
                { icon: "fas fa-ban", action: "Enable/Disable" },
                { icon: "fas fa-trash-alt", action: "Delete" },
              ],
            },
            {
              name: "QS express delivery(Fake)",
              claim:
                "Free shipping on purchases over $ 600, delivery on delivery under $ 600",
              statusO: { name: "Active", class: "open" },
              statusC: { name: "Inactive", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "Edit" },
                { icon: "fas fa-ban", action: "Enable/Disable" },
                { icon: "fas fa-trash-alt", action: "Delete" },
              ],
            },
            {
              name: "DBS express delivery(Fake)",
              claim:
                "Free shipping on purchases over $ 1000, delivery on delivery under $ 1000",
              statusO: { name: "Active", class: "open" },
              statusC: { name: "Inactive", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "Edit" },
                { icon: "fas fa-ban", action: "Enable/Disable" },
                { icon: "fas fa-trash-alt", action: "Delete" },
              ],
            },
          ],
          delPop: [
            {
              isOpen: false,
              name: "DBQ express delivery(Fake)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Delete", class: "delete" },
              ],
            },
            {
              isOpen: false,
              name: "QS express delivery(Fake)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Delete", class: "delete" },
              ],
            },
            {
              isOpen: false,
              name: "DBS express delivery(Fake)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Delete", class: "delete" },
              ],
            },
          ],
          editPop: [
            {
              isOpen: false,
              title: "Edit Shipping Method",
              icon: "fas fa-times",
              label: ["Display Name", "Shipping Instruction"],
              content: [
                "DBQ express delivery(Fake)",
                "Free shipping on purchases over $ 300, delivery on delivery under $ 300",
              ],
              noti: "Instruction will be shown in the checkout page!",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Update", class: "update" },
              ],
            },
            {
              isOpen: false,
              title: "Edit Shipping Method",
              icon: "fas fa-times",
              label: ["Display Name", "Shipping Instruction"],
              content: [
                "QS express delivery(Fake)",
                "Free shipping on purchases over $ 600, delivery on delivery under $ 600",
              ],
              noti: "Instruction will be shown in the checkout page!",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Update", class: "update" },
              ],
            },
            {
              isOpen: false,
              title: "Edit Shipping Method",
              icon: "fas fa-times",
              label: ["Display Name", "Shipping Instruction"],
              content: [
                "DBS express delivery(Fake)",
                "Free shipping on purchases over $ 1000, delivery on delivery under $ 1000",
              ],
              noti: "Instruction will be shown in the checkout page!",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Update", class: "update" },
              ],
            },
          ],
          addPop: {
            isOpen: false,
            title: "Add New Shipping Method",
            icon: "fas fa-times",
            label: ["Display Name", "Shipping Instruction"],
            content: ["", ""],
            noti: "Instruction will be shown in the checkout page!",
            buttons: [
              { name: "Cancel", class: "cancel" },
              { name: "Create", class: "create" },
            ],
          },
        };
      },
    },
    payment: {
      template: `<div id="payment" class="clearfix">
                  <div class="col-12 row1">
                    <h3>{{title}}</h3>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t.name}}</th>
                      </tr>
                      <tr class="payment" v-for="(p,idx) in payments">
                        <td>{{p.name}}</td>
                        <td>{{p.claim}}</td>
                        <td>
                          <span :class="p.statusO.class" v-if="p.status">{{p.statusO.name}}</span>
                          <span :class="p.statusC.class" v-else>{{p.statusC.name}}</span>
                        </td>
                        <td>
                          <a href="javascript:;">
                            <i :class="p.actions[0].icon" @click="editPop[idx].isOpen = true"/>
                            <span>{{p.actions[0].action}}</span>
                          </a>
                          <a href="javascript:;">
                            <i :class="p.actions[1].icon" @click="payments[idx].status = !payments[idx].status"/>
                            <span>{{p.actions[1].action}}</span>
                          </a>
                          <a href="javascript:;">
                            <i :class="p.actions[2].icon" @click="delPop[idx].isOpen = true" />
                            <span>{{p.actions[2].action}}</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="popup-background del" :class="{'active':d.isOpen}" @click.self="d.isOpen = false" v-for="d in delPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <i :class="d.icon"/>
                      </div>
                      <div class="col-12 modal-body">
                        <p>Are you sure to delete " {{d.name}} " ?</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="d.buttons[0].class" @click="d.isOpen = false">{{d.buttons[0].name}}</a>
                        <a href="javascript:;" :class="d.buttons[1].class">{{d.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background payment-edit" :class="{'active':e.isOpen}" @click.self="e.isOpen = false" v-for="e in editPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{e.title}}</h2>
                        <button @click="e.isOpen = false"><i :class="e.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{e.label[0]}}</h4>
                        <input type="text" v-model="e.content[0]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{e.label[1]}}</h4>
                        <input type="text" v-model="e.content[1]">
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="e.buttons[0].class" @click="e.isOpen = false">{{e.buttons[0].name}}</a>
                        <a href="javascript:;" :class="e.buttons[1].class">{{e.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background payment-add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{addPop.title}}</h2>
                        <button @click="addPop.isOpen = false"><i :class="addPop.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[0]}}</h4>
                        <input type="text" v-model="addPop.content[0]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[1]}}</h4>
                        <input type="text" v-model="addPop.content[1]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[2]}}</h4>
                        <input type="text" v-model="addPop.content[2]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[3]}}</h4>
                        <input type="text" v-model="addPop.content[3]">
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[4]}}</h4>
                        <input type="text" v-model="addPop.content[4]">
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "Setup Payment Methods",
          button: { name: "ADD", icon: "fas fa-plus" },
          thead: [
            { name: "Payment Method" },
            { name: "Payment Instruction" },
            { name: "Status" },
            { name: "Action" },
          ],
          payments: [
            {
              name: "Bank transfer(Fake)",
              claim:
                "Please transfer funds to bank account within 3 days after placing the order",
              statusO: { name: "Active", class: "open" },
              statusC: { name: "Inactive", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "Edit" },
                { icon: "fas fa-ban", action: "Enable/Disable" },
                { icon: "fas fa-trash-alt", action: "Delete" },
              ],
            },
            {
              name: "Convenience Store Payment(Fake)",
              claim:
                "Carry out payment and payment at major convenience stores",
              statusO: { name: "Active", class: "open" },
              statusC: { name: "Inactive", class: "close" },
              status: false,
              actions: [
                { icon: "fas fa-edit", action: "Edit" },
                { icon: "fas fa-ban", action: "Enable/Disable" },
                { icon: "fas fa-trash-alt", action: "Delete" },
              ],
            },
          ],
          delPop: [
            {
              isOpen: false,
              name: "Bank Transfer(Fake)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Delete", class: "delete" },
              ],
            },
            {
              isOpen: false,
              name: "Convenience Store Payment(Fake)",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Delete", class: "delete" },
              ],
            },
          ],
          editPop: [
            {
              isOpen: false,
              title: "Edit Payment Method",
              icon: "fas fa-times",
              label: [
                "Display Name",
                "Account Name",
                "Account Number",
                "Account Payee Name",
                "Payment Instruction",
              ],
              content: [
                "Bank Transfer(Fake)",
                "Good Store Bank",
                "12344-112323-1111",
                "Jacko",
                "Please transfer funds to bank account within 3 days after placing the order",
              ],
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Update", class: "update" },
              ],
            },
            {
              isOpen: false,
              title: "Edit Payment Method",
              icon: "fas fa-times",
              label: [
                "Display Name",
                "Account Name",
                "Account Number",
                "Account Payee Name",
                "Payment Instruction",
              ],
              content: [
                "Convenience Store Payment(Fake)",
                "Good Store Bank",
                "12344-112323-1111",
                "Jacko",
                "Carry out payment and payment at major convenience stores",
              ],
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Update", class: "update" },
              ],
            },
          ],
          addPop: {
            isOpen: false,
            title: "New Payment Method",
            icon: "fas fa-times",
            label: [
              "Display Name",
              "Account Name",
              "Account Number",
              "Account Payee Name",
              "Payment Instruction",
            ],
            content: ["", "", "", "", ""],
            buttons: [
              { name: "Cancel", class: "cancel" },
              { name: "Create", class: "create" },
            ],
          },
        };
      },
    },
    productsettings: {
      template: `<div id="productsettings" class="clearfix">
                  <div class="col-12">
                    <h4>{{title}}</h4>
                  </div>
                  <div class="col-12 setting" v-for="(s,idx) in settings" :class="[s.classname,{'active':s.isOpen}]">
                    <div class="card-title" @click="s.isOpen = !s.isOpen">
                      <p>
                        <span :class="s.statusO.class" v-if="s.status">{{s.statusO.name}}</span>
                        <span :class="s.statusC.class" v-else>{{s.statusC.name}}</span>
                        {{s.item}}
                      </p>
                      <a href="javascript:;">
                            <i :class="s.actionicon"/>
                            <span>{{s.actionname}}</span>
                      </a>
                    </div>
                    <div class="card-body" v-if="s.isOpen === true">
                      <label class="checkbox">
                        <input type="checkbox" v-model="s.status">
                        <span class="knob"/>
                        <span class="bg"/>
                      </label>
                      <label class="content">{{s.item}}</label>
                      <button @click="s.isOpen = false;">{{s.button}}</button>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          open: false,
          title: "The settings below will be shown in product details page:",
          settings: [
            {
              isOpen: false,
              classname: "item1",
              statusO: { name: "Active", class: "open" },
              statusC: { name: "Inactive", class: "close" },
              status: false,
              item: "Show product available inventory",
              actionname: "Edit",
              actionicon: "fas fa-edit",
              button: "Close",
            },
            {
              isOpen: false,
              classname: "item2",
              statusO: { name: "Active", class: "open" },
              statusC: { name: "Inactive", class: "close" },
              status: false,
              item: "Show numbers of products sold",
              actionname: "Edit",
              actionicon: "fas fa-edit",
              button: "Close",
            },
            {
              isOpen: false,
              classname: "item3",
              statusO: { name: "Active", class: "open" },
              statusC: { name: "Inactive", class: "close" },
              status: false,
              item: "General Notice for Customers",
              actionname: "Edit",
              actionicon: "fas fa-edit",
              button: "Close",
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
    changeTab(idx) {
      let l = this.tabs.length;
      for (let i = 0; i < l; i++) {
        this.tabs[i].active = false;
      }
      this.tabs[idx].active = true;
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});
const teammateEnTag = Vue.component("teammate-en-tag", {
  template: `<div id="teammate" :class="{'active':isOpen}">
              <div class="wrapper">
                <div class="container">
                  <div class="col-12">
                    <div class="button">
                      <button @click="changeView(t.c_name);changeTab(idx);" :class="{'active': t.active}" v-for="(t,idx) in tabs" :key="t.name"><i :class="t.icon"></i>{{t.name}}</button>
                    </div>
                    <component :is="view"/>
                  </div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isOpen: false,
      title: "Shop Admins",
      view: "admin",
      tabs: [
        {
          c_name: "admin",
          name: "SHOP ADMINS",
          icon: "fas fa-user-friends",
          active: true,
        },
        {
          c_name: "helper",
          name: "SHOP ASSISTANTS",
          icon: "fas fa-user",
          active: false,
        },
      ],
    };
  },
  components: {
    admin: {
      template: `<div id="admin">
                  <div class="col-12 row1">
                    <h1>{{title}}</h1>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t}}</th>
                      </tr>
                      <tr v-for="(a,idx) in admins">
                        <td><i :class="a.icon"><span class="name">{{a.name}}</span><span :class="a.level[1]">{{a.level[0]}}</span></i></td>
                        <td><span :class="a.status[1]">{{a.status[0]}}</span></td>
                        <td> 
                          <a href="javascript:;" @click="delPop[idx].isOpen = true">
                            <i :class="a.a_icon"/>
                            <span>{{a.action}}</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-r">Rows per page: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                  <div class="popup-background del" :class="{'active':d.isOpen}" @click.self="d.isOpen = false" v-for="d in delPop">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <i :class="d.icon"/>
                      </div>
                      <div class="col-12 modal-body">
                        <p>Are you sure to delete " {{d.name}} " ?</p>
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="d.buttons[0].class" @click="d.isOpen = false">{{d.buttons[0].name}}</a>
                        <a href="javascript:;" :class="d.buttons[1].class">{{d.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="popup-background admin-add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{addPop.title}}</h2>
                        <button @click="addPop.isOpen = false"><i :class="addPop.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[0]}}</h4>
                        <input type="text" v-model="addPop.content[0]">
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "Shop Admins",
          button: { name: "INVITE NEW ADMIN", icon: "fas fa-plus" },
          thead: ["Account", "Status", "Action"],
          admins: [
            {
              icon: "fas fa-user-circle",
              name: "New Admins",
              level: [null, "none"],
              status: ["Pending", "wait"],
              action: "Delete",
              a_icon: "fas fa-trash-alt",
            },
            {
              icon: "fas fa-user-circle",
              name: "Jacko",
              level: ["Owner", "level"],
              status: ["Active", "active"],
              action: null,
              a_icon: "none",
            },
          ],
          pages: [10, 20, 50, 100],
          icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
          delPop: [
            {
              isOpen: false,
              name: "New Admins",
              icon: "fas fa-exclamation",
              buttons: [
                { name: "Cancel", class: "cancel" },
                { name: "Delete", class: "delete" },
              ],
            },
          ],
          addPop: {
            isOpen: false,
            title: "New Amins",
            icon: "fas fa-times",
            label: ["Admin Name"],
            content: [""],
            buttons: [
              { name: "Cancel", class: "cancel" },
              { name: "Create", class: "create" },
            ],
          },
        };
      },
    },
    helper: {
      template: `<div id="helper">
                  <div class="col-12 row1">
                    <h1>{{title}}</h1>
                    <button @click="addPop.isOpen = true"><i :class="button.icon"></i>{{button.name}}</button>
                  </div>
                  <div class="row2">
                    <table>
                      <tr>
                        <th v-for="t in thead">{{t.name}}</th>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-c">{{result}}</td>
                      </tr>
                      <tr>
                        <td colspan="6" class="txt-r">Rows per page: <select><option v-for="p in pages" :value="p">{{p}}</option></select> - <i :class="i" v-for="i in icons"/></td>
                      </tr>
                    </table>
                  </div>
                  <div class="popup-background helper-add" :class="{'active':addPop.isOpen}" @click.self="addPop.isOpen = false">
                    <div class="popup">
                      <div class="col-12 modal-head">
                        <h2>{{addPop.title}}</h2>
                        <button @click="addPop.isOpen = false"><i :class="addPop.icon"/></button>
                      </div>
                      <div class="col-12 modal-body">
                        <h4>{{addPop.label[0]}}</h4>
                        <input type="text" v-model="addPop.content[0]">
                      </div>
                      <div class="col-12 modal-footer">
                        <a href="javascript:;" :class="addPop.buttons[0].class" @click="addPop.isOpen = false">{{addPop.buttons[0].name}}</a>
                        <a href="javascript:;" :class="addPop.buttons[1].class">{{addPop.buttons[1].name}}</a>
                      </div>
                    </div>
                  </div>
                </div>`,
      data() {
        return {
          title: "Shop Assistants",
          button: { name: "ADD", icon: "fas fa-plus" },
          thead: [{ name: "Account" }, { name: "Status" }, { name: "Action" }],
          result: "No data available",
          pages: [10, 20, 50, 100],
          icons: ["fas fa-arrow-left", "fas fa-arrow-right"],
          addPop: {
            isOpen: false,
            title: "New Assisant",
            icon: "fas fa-times",
            label: ["Assisant Name"],
            content: [""],
            buttons: [
              { name: "Cancel", class: "cancel" },
              { name: "Create", class: "create" },
            ],
          },
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
    changeTab(idx) {
      let l = this.tabs.length;
      for (let i = 0; i < l; i++) {
        this.tabs[i].active = false;
      }
      this.tabs[idx].active = true;
    },
  },
  mounted() {
    this.open();
    this.close();
  },
});

new Vue({
  el: "#app",
  data() {
    return {
      view: indexTag,
      abbrr: "Zh",
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
    indexEnTag,
    mainDirectoryEnTag,
    helpCenterEnTag,
    notificationsEnTag,
    ordersEnTag,
    productsEnTag,
    subscriptionPlanEnTag,
    shopSettingsEnTag,
    teammateEnTag,
    promoCodeEnTag,
  },
  methods: {
    changeView() {
      vm.$on("change-V", (v) => {
        this.view = v;
      });
    },
    receiveLang() {
      vm.$on("lang", (a) => {
        console.log(a);
        this.abbrr = a;
        if (this.abbrr === "Zh") {
          this.view = indexTag;
        } else {
          this.view = indexEnTag;
        }
      });
    },
  },
  mounted() {
    this.changeView();
    this.receiveLang();
  },
});
