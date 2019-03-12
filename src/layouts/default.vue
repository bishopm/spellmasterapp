<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="fa fa-bars" />
        </q-btn>
        <q-toolbar-title>
          <router-link to="/">SpellMaster</router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable to="/addword">
          <q-item-section avatar>
            <q-icon name="fa fa-plus" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Add words</q-item-label>
            <q-item-label caption>or search for existing words to edit</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/allwords">
          <q-item-section avatar>
            <q-icon name="fa fa-list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>All words</q-item-label>
            <q-item-label caption>List all words</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/settings">
          <q-item-section avatar>
            <q-icon name="fa fa-cog" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
            <q-item-label caption>Tokens etc</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>

<style>
a {
  color:white;
  text-decoration: none;
}
</style>
