# Unit Tests

This directory contains unit tests for the La Torre Roja website.

## Test Coverage

### 1. CSS Media Query Tests (`styles-and-swiper.test.js`)
Tests for `.mil-partner-frame` media query at screen width <= 390px:
- Verifies the media query exists for max-width 390px
- Checks that `.mil-partner-frame` width is set to 70px
- Validates that `.mil-partner-frame img` width is 100%
- Confirms margin is set to 0 300px

### 2. Swiper Slider Breakpoint Tests (`styles-and-swiper.test.js`)
Tests for Swiper slider breakpoints in `.mil-infinite-show`:
- Verifies breakpoint configuration at 660px with `slidesPerView: 3`
- Verifies breakpoint configuration at 390px with `slidesPerView: 2`
- Ensures both breakpoints exist in the same Swiper instance
- Validates default `slidesPerView` value of 4

## Setup

Install the test dependencies:

```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Test Framework

- **Jest**: Testing framework
- **jsdom**: DOM implementation for testing
