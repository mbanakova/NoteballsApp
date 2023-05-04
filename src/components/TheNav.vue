<template>
  <header class="header">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container navbar__container">
        <div class="navbar-brand">
          <div class="navbar-item">Noteballs</div>

          <button
            class="navbar__burger"
            :class="{ 'navbar__burger--open': showMobileNav }"
            aria-label="menu"
            aria-expanded="false"
            @click.prevent="toggleMobileNav"
            ref="navBarBurgerRef"
          >
            <div class="bar"></div>
          </button>
        </div>

        <div
          class="navbar__links"
          :class="{ 'navbar__links--open': showMobileNav }"
          ref="navBarMenuRef"
        >
          <RouterLink
            to="/"
            class="nav-link"
            active-class="is-active"
            @click="showMobileNav = false"
            >Notes</RouterLink
          >

          <RouterLink
            to="/stats"
            class="nav-link"
            active-class="is-active"
            @click="showMobileNav = false"
            >Stats</RouterLink
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const showMobileNav = ref(false)

const toggleMobileNav = () => {
  showMobileNav.value = !showMobileNav.value
}

const navBarMenuRef = ref(null)
const navBarBurgerRef = ref(null)

onClickOutside(
  navBarMenuRef,
  () => {
    showMobileNav.value = false
  },
  {
    ignore: [navBarBurgerRef]
  }
)
</script>

<style lang="scss" scoped>
.header {
  background-color: $accent;
  color: $white;
  padding: 10px;
}
.navbar__container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 20px;
}
.navbar__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border: 1px solid $white;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  position: relative;
  cursor: pointer;

  & .bar {
    width: 20px;
    height: 1px;
    background-color: $white;
  }

  & ::before,
  ::after {
    position: absolute;
    content: '';
    width: 20px;
    height: 1px;
    top: 7px;
    left: 4px;
    background-color: $white;
  }

  & ::after {
    top: 20px;
  }

  &--open {
    background-color: $error;
  }
}

.navbar__links {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;

  &--open {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
}
</style>
