import { AppContentLayoutNav, NavbarType } from '@utils/layouts/enums'
import { injectionKeyIsVerticalNavHovered } from '@utils/layouts/symbols'
// import { _setDirAttr } from '@layouts/utils'

// ℹ️ We should not import themeConfig here but in urgency we are doing it for now
import { themeConfig } from '@themeConfig'

export const namespaceConfig = str => `${themeConfig.app.title}-${str}`
export const cookieRef = (key, defaultValue) => {
  return useCookie(namespaceConfig(key), { default: () => defaultValue })
}
export const useLayoutConfigStore = defineStore('themeConfig', () => {
  const route = useRoute()

  // 👉 Navbar Type
  const navbarType = ref(themeConfig.navbar.type)

  // 👉 Navbar Type
  const isNavbarBlurEnabled = cookieRef('isNavbarBlurEnabled', themeConfig.navbar.navbarBlur)

  // 👉 Vertical Nav Collapsed
  const isVerticalNavCollapsed = cookieRef('isVerticalNavCollapsed', themeConfig.verticalNav.isVerticalNavCollapsed)

  // 👉 App Content Width
  const appContentWidth = cookieRef('appContentWidth', themeConfig.app.contentWidth)

  // 👉 App Content Layout Nav
  const appContentLayoutNav = ref(themeConfig.app.contentLayoutNav)

  watch(appContentLayoutNav, val => {
    // If Navbar type is hidden while switching to horizontal nav => Reset it to sticky
    if (val === AppContentLayoutNav.Horizontal) {
      if (navbarType.value === NavbarType.Hidden)
        navbarType.value = NavbarType.Sticky
      isVerticalNavCollapsed.value = false
    }
  })


  // 👉 Horizontal Nav Type
  const horizontalNavType = ref(themeConfig.horizontalNav.type)

  //  👉 Horizontal Nav Popover Offset
  const horizontalNavPopoverOffset = ref(themeConfig.horizontalNav.popoverOffset)

  // 👉 Footer Type
  const footerType = ref(themeConfig.footer.type)

  // 👉 Misc
  const isLessThanOverlayNavBreakpoint = computed(() => useMediaQuery(`(max-width: ${themeConfig.app.overlayNavFromBreakpoint}px)`).value)


  // 👉 Layout Classes
  const _layoutClasses = computed(() => {
    const { y: windowScrollY } = useWindowScroll()
    
    return [
      `layout-nav-type-${appContentLayoutNav.value}`,
      `layout-navbar-${navbarType.value}`,
      `layout-footer-${footerType.value}`,
      {
        'layout-vertical-nav-collapsed': isVerticalNavCollapsed.value
                    && appContentLayoutNav.value === 'vertical'
                    && !isLessThanOverlayNavBreakpoint.value,
      },
      { [`horizontal-nav-${horizontalNavType.value}`]: appContentLayoutNav.value === 'horizontal' },
      `layout-content-width-${appContentWidth.value}`,
      { 'layout-overlay-nav': isLessThanOverlayNavBreakpoint.value },
      { 'window-scrolled': unref(windowScrollY) },
      route.meta.layoutWrapperClasses ? route.meta.layoutWrapperClasses : null,
    ]
  })


  // 👉 RTL
  // const isAppRTL = ref(themeConfig.app.isRTL)
  // const isAppRTL = ref(false)

  // watch(isAppRTL, val => {
  //   _setDirAttr(val ? 'rtl' : 'ltr')
  // })


  // 👉 Is Vertical Nav Mini
  /*
      This function will return true if current state is mini. Mini state means vertical nav is:
        - Collapsed
        - Isn't hovered by mouse
        - nav is not less than overlay breakpoint (hence, isn't overlay menu)
  
      ℹ️ We are getting `isVerticalNavHovered` as param instead of via `inject` because
          we are using this in `VerticalNav.vue` component which provide it and I guess because
          same component is providing & injecting we are getting undefined error
    */
  const isVerticalNavMini = (isVerticalNavHovered = null) => {
    const isVerticalNavHoveredLocal = isVerticalNavHovered || inject(injectionKeyIsVerticalNavHovered) || ref(false)
    
    return computed(() => isVerticalNavCollapsed.value && !isVerticalNavHoveredLocal.value && !isLessThanOverlayNavBreakpoint.value)
  }

  return {
    appContentWidth,
    appContentLayoutNav,
    navbarType,
    isNavbarBlurEnabled,
    isVerticalNavCollapsed,
    horizontalNavType,
    horizontalNavPopoverOffset,
    footerType,
    isLessThanOverlayNavBreakpoint,
    isAppRTL,
    _layoutClasses,
    isVerticalNavMini,
  }
})
