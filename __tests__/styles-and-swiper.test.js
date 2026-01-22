/**
 * Unit tests for:
 * 1. CSS media query for .mil-partner-frame at screen width <= 390px
 * 2. Swiper slider breakpoints for widths 660 and 390
 */

const fs = require('fs');
const path = require('path');

describe('CSS Media Query Tests', () => {
  let styleContent;

  beforeAll(() => {
    // Read the CSS file
    const cssPath = path.join(__dirname, '../css/style.css');
    styleContent = fs.readFileSync(cssPath, 'utf-8');
  });

  describe('.mil-partner-frame media query for max-width: 390px', () => {
    test('should contain media query for max-width 390px', () => {
      const mediaQueryRegex = /@media\s+screen\s+and\s+\(max-width:\s*390px\)/;
      expect(styleContent).toMatch(mediaQueryRegex);
    });

    test('should set .mil-partner-frame width to 70px at max-width 390px', () => {
      // Extract the 390px media query block
      const mediaQueryBlock = styleContent.match(
        /@media\s+screen\s+and\s+\(max-width:\s*390px\)\s*\{([\s\S]*?)\n\}/
      );
      
      expect(mediaQueryBlock).not.toBeNull();
      
      const blockContent = mediaQueryBlock[1];
      
      // Check that .mil-partner-frame has width: 70px
      expect(blockContent).toMatch(/\.mil-partner-frame\s*\{/);
      expect(blockContent).toMatch(/width:\s*70px\s*!important/);
    });

    test('should set .mil-partner-frame img width to 100% at max-width 390px', () => {
      // Extract the 390px media query block
      const mediaQueryBlock = styleContent.match(
        /@media\s+screen\s+and\s+\(max-width:\s*390px\)\s*\{([\s\S]*?)\n\}/
      );
      
      const blockContent = mediaQueryBlock[1];
      
      // Check that .mil-partner-frame img has width: 100%
      expect(blockContent).toMatch(/\.mil-partner-frame\s+img\s*\{/);
      expect(blockContent).toMatch(/width:\s*100%/);
    });

    test('should set .mil-partner-frame img margin to 0 300px at max-width 390px', () => {
      // Extract the 390px media query block
      const mediaQueryBlock = styleContent.match(
        /@media\s+screen\s+and\s+\(max-width:\s*390px\)\s*\{([\s\S]*?)\n\}/
      );
      
      const blockContent = mediaQueryBlock[1];
      
      // Check that .mil-partner-frame img has margin: 0 300px
      expect(blockContent).toMatch(/margin:\s*0\s+300px\s*!important/);
    });
  });
});

describe('Swiper Slider Breakpoint Tests', () => {
  let mainJsContent;
  let swiperConfigs;

  beforeAll(() => {
    // Read the main.js file
    const jsPath = path.join(__dirname, '../js/main.js');
    mainJsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Extract Swiper configurations for .mil-infinite-show
    const swiperRegex = /new\s+Swiper\s*\(\s*['"]\.mil-infinite-show['"]\s*,\s*\{([\s\S]*?)\}\s*\)/g;
    swiperConfigs = [];
    let match;
    
    while ((match = swiperRegex.exec(mainJsContent)) !== null) {
      swiperConfigs.push(match[1]);
    }
  });

  describe('Swiper .mil-infinite-show slider breakpoints', () => {
    test('should find Swiper configurations for .mil-infinite-show', () => {
      expect(swiperConfigs.length).toBeGreaterThan(0);
    });

    test('should have breakpoint configuration at 660px', () => {
      const hasBreakpoint660 = swiperConfigs.some(config => {
        return /660\s*:\s*\{/.test(config);
      });
      
      expect(hasBreakpoint660).toBe(true);
    });

    test('should set slidesPerView to 3 at breakpoint 660px', () => {
      const breakpoint660Config = swiperConfigs.find(config => {
        return /660\s*:\s*\{[\s\S]*?slidesPerView:\s*3/.test(config);
      });
      
      expect(breakpoint660Config).toBeDefined();
      
      // Extract the 660 breakpoint block
      const breakpointMatch = breakpoint660Config.match(/660\s*:\s*\{([^}]*)\}/);
      expect(breakpointMatch).not.toBeNull();
      expect(breakpointMatch[1]).toMatch(/slidesPerView:\s*3/);
    });

    test('should have breakpoint configuration at 390px', () => {
      const hasBreakpoint390 = swiperConfigs.some(config => {
        return /390\s*:\s*\{/.test(config);
      });
      
      expect(hasBreakpoint390).toBe(true);
    });

    test('should set slidesPerView to 2 at breakpoint 390px', () => {
      const breakpoint390Config = swiperConfigs.find(config => {
        return /390\s*:\s*\{[\s\S]*?slidesPerView:\s*2/.test(config);
      });
      
      expect(breakpoint390Config).toBeDefined();
      
      // Extract the 390 breakpoint block
      const breakpointMatch = breakpoint390Config.match(/390\s*:\s*\{([^}]*)\}/);
      expect(breakpointMatch).not.toBeNull();
      expect(breakpointMatch[1]).toMatch(/slidesPerView:\s*2/);
    });

    test('should verify both breakpoints exist in the same Swiper instance', () => {
      const configWithBothBreakpoints = swiperConfigs.find(config => {
        const has660 = /660\s*:\s*\{[\s\S]*?slidesPerView:\s*3/.test(config);
        const has390 = /390\s*:\s*\{[\s\S]*?slidesPerView:\s*2/.test(config);
        return has660 && has390;
      });
      
      expect(configWithBothBreakpoints).toBeDefined();
    });

    test('should have correct default slidesPerView value', () => {
      const configWithDefault = swiperConfigs.find(config => {
        return /slidesPerView:\s*4/.test(config);
      });
      
      expect(configWithDefault).toBeDefined();
    });
  });
});
