<script setup lang="ts">
import Container from "./Container.vue";
</script>

<template>
  <div class="source">
    <Container>
      <div class="wrapper">
        <div class="icon-container">
          <div class="tail"></div>
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </div>
        </div>

        <h2 class="title"><span>Open Source</span></h2>
        <p class="desc">Moodist is free and open-source!</p>

        <div class="button">
          <a
            href="https://github.com/iss-tools/moodist-vue"
            target="_blank"
            rel="noopener noreferrer"
            class="special-button"
          >
            Source Code
          </a>
        </div>

        <div class="binary">
          <div class="binary-text">
            01001000 01100101 01101100 01101100 01101111 00100000 01010111
            01101111 01110010 01101100 01100100 00100000 01001101 01101111
            01101111 01100100 01101001 01110011 01110100 00100000 01001111
            01110000 01100101 01101110 00100000 01010011 01101111 01110101
            01110010 01100011 01100101 00100000 01000110 01110010 01100101
            01100101 00100000 01000001 01101101 01100010 01101001 01100101
            01101110 01110100
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<style scoped lang="scss">
.source {
  margin-top: 40px;

  .wrapper {
    position: relative;
    padding: 0 20px 40px;
    overflow: hidden;
    background: linear-gradient(transparent, rgb(24 24 27 / 70%));
    border-radius: 0 0 20px 20px;

    .binary {
      position: absolute;
      bottom: -2.1rem;
      left: 50%;
      width: calc(100% + 10px);
      height: 200px;
      overflow: hidden;
      font-family: "Nimbus Mono PS", "Courier New", monospace;
      color: var(--color-foreground-subtler);
      word-break: break-all;
      pointer-events: none;
      cursor: default;
      user-select: none;
      opacity: 0.35;
      mask-image: linear-gradient(transparent, #000);
      transform: translateX(-50%);

      .binary-text {
        font-size: 14px;
        line-height: 1.4;
      }
    }

    &::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 70%;
      height: 1px;
      content: "";
      background: linear-gradient(
        90deg,
        transparent,
        var(--color-neutral-400),
        transparent
      );
      transform: translateX(-50%);
    }
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;

    .tail {
      width: 1px;
      height: 75px;
      background: linear-gradient(transparent, var(--color-neutral-300));
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      font-size: var(--font-md);
      background: linear-gradient(
        var(--color-neutral-50),
        var(--color-neutral-100)
      );
      border: 1px solid var(--color-neutral-300);
      border-radius: 50%;
    }
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--font-lg);
    font-weight: 600;
    text-align: center;

    span {
      background: linear-gradient(
        135deg,
        var(--color-foreground),
        var(--color-foreground-subtle)
      );
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .desc {
    margin-top: 8px;
    color: var(--color-foreground-subtle);
    text-align: center;
  }

  .button {
    display: flex;
    justify-content: center;
    margin: 16px auto 0;

    .special-button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 500;
      color: var(--color-foreground);
      text-decoration: none;
      background: linear-gradient(
        var(--color-neutral-100),
        var(--color-neutral-50)
      );
      border: 1px solid var(--color-neutral-200);
      border-radius: 50px;
      transition: all 0.2s ease;

      &:hover {
        background: linear-gradient(
          var(--color-neutral-200),
          var(--color-neutral-100)
        );
        transform: translateY(-1px);
      }
    }
  }
}
</style>
