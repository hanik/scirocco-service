<template>
  <!-- Navigator Area -->
  <nav id="navigator">
    <div class="left-area">
      <div class="logo">{{ labels.brand }}</div>

      <div :class="[{active: clickedMenu === labels.current.toLowerCase()}, 'menu']" @click="menuClicked($event)">{{ labels.current }}</div>
      <div :class="[{active: clickedMenu === labels.history.toLowerCase()}, 'menu']" @click="menuClicked($event)">{{ labels.history }}</div>
    </div>

    <div class="right-area">
      <div class="ic-noti"></div>
      <div class="user-account">icebar2002@gmail.com</div>
      <div class="ic-dropdown" @click="toggleDropdown">
        <div class="dropdown-menus" v-show="dropdownVisibility">
          <div class="dropdown-items">Profile</div>
          <div class="dropdown-items" @click="signout">Sign out</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { COMMONS } from '@/strings';

const labels = {
  brand: COMMONS.LABEL_BRAND,
  current: COMMONS.LABEL_CURRENT,
  history: COMMONS.LABEL_HISTORY,
  profile: COMMONS.LABEL_PROFILE,
  signout: COMMONS.LABEL_SINGOUT,
};

export default {
  name: 'Navigator',
  data() {
    return {
      labels,
      clickedMenu: '',
      dropdownVisibility: false,
    };
  },
  methods: {
    menuClicked(event) {
      this.clickedMenu = event.currentTarget.innerHTML.toLowerCase();
      this.$router.push(`/${this.clickedMenu}`);
    },
    signout() {
      this.$router.push('/login');
    },
    toggleDropdown() {
      this.dropdownVisibility = !this.dropdownVisibility;
    },
  },
  mounted() {
    if (this.clickedMenu === '') {
      this.clickedMenu = this.$route.path.split('/')[1];
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#navigator {
  @include size(100%, 56px);
  min-width: 900px;
  background-color: #24435b;
  color: white;
  display: flex;

  .left-area, .right-area {
    flex: 1 1 0;
    @include flex-align-center-vertical;
  }

  .left-area {
    justify-content: flex-start;
  }

  .right-area {
    justify-content: flex-end;
  }

  .logo {
    @include size(153px, 56px);
    padding: 0 40px 0 30px;
    line-height: 56px;
    font-size: 17px;
    font-weight: bold;
  }

  .menu {
    @include size(120px, 56px);
    font-size: 16px;
    font-weight: bold;
    line-height: 56px;
    cursor: pointer;

    &.active {
      background-color: #123047;
    }
  }

  .ic-noti {
    @include size(30px);
    background: url("../../assets/ic-noti.svg");
    margin-right: 40px;
    cursor: pointer;
  }

  .ic-dropdown {
    @include size(30px, 27px);
    background-color: white;
    margin-right: 10px;
    cursor: pointer;

    .dropdown-menus {
      @include size(100px);
      background-color: pink;
      z-index: 100;
      position: absolute;
      margin: 27px 0 0 -70px;
    }
  }

  .user-account {
    @include size(auto, 100%);
    line-height: 56px;
    margin-right: 6px;
  }

}

</style>
