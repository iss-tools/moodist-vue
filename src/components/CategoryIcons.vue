<script setup lang="ts">
import type { Component } from "vue";
import * as LucideIcons from "lucide-vue-next";
import { sounds } from "../data/sounds";
import { HelpCircle } from "lucide-vue-next";

const categories = sounds.categories;

const getIcon = (iconName: any): Component => {
  const icon = (LucideIcons as any)[iconName];
  if (!icon) return HelpCircle;
  return icon as Component;
};

const goto = (id: string) => {
  const category = document.getElementById(`category-${id}`);
  category?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <Container>
    <div class="wrapper">
      <h3 class="title">Categories</h3>
      <div class="category-icons-wrapper">
        <button
          v-for="category in categories"
          :key="category.id"
          class="icon"
          :title="category.title"
          @click="goto(category.id)"
        >
          <component :is="getIcon(category.icon)" />
        </button>
      </div>
    </div>
  </Container>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 40px 0;

  .title {
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-foreground-subtle);
    text-align: center;
  }

  .category-icons-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      font-size: 20px;
      color: var(--color-foreground-subtle);
      cursor: pointer;
      background: var(--color-neutral-100);
      border: 1px solid var(--color-neutral-200);
      border-radius: 12px;
      transition: all 0.2s ease;

      &:hover {
        color: var(--color-foreground);
        background: var(--color-neutral-200);
        transform: translateY(-2px);
      }
    }
  }
}
</style>
