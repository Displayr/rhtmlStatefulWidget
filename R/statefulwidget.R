#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
statefulwidget <- function(message, width=NULL, height=NULL, elementId=NULL, can_run_in_root_dom=FALSE, crash_on_render=FALSE, 
                           crash_on_rerender=FALSE, crash_on_resize=FALSE, crash_on_naive_click=FALSE, crash_on_jquery_hover=FALSE, crash_on_timeout=FALSE) {
  
  # If the widget is in iframe, loading jquery will trigger the error, so we prevents 
  # jquery to be loaded.
  # If the widget is a iframeless widget, it's ok to have jquery reference because
  # it shares jquery with Displayr  
  if (crash_on_jquery_hover && !can_run_in_root_dim)
    stop('crash_on_jquery_hover requires jQuery because it wants the crash to go via a jQuery event, which is not loaded if we are running in an IFRAME.  If you need this then make the widget specify that it needs jQuery')

  # forward options using x
  x = list(
    message = message,
    crash_on_render = crash_on_render,
    crash_on_rerender = crash_on_rerender,
    crash_on_resize = crash_on_resize,
    crash_on_naive_click = crash_on_naive_click,
    crash_on_jquery_hover = crash_on_jquery_hover,
    crash_on_timeout = crash_on_timeout
  )

  # create widget
  w <- htmlwidgets::createWidget(
    name = 'statefulwidget',
    x,
    width = width,
    height = height,
    package = 'statefulwidget',
    elementId = elementId,
    sizingPolicy = sizingPolicy(padding = 0, browser.fill = TRUE)
  )

  # default is FALSE for backwards compatibility of existing Chrome tests
  attr(w, "can-run-in-root-dom") <- can_run_in_root_dom

  w
}

#' Shiny bindings for statefulwidget
#'
#' Output and render functions for using statefulwidget within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a statefulwidget
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name statefulwidget-shiny
#'
#' @export
statefulwidgetOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'statefulwidget', width, height, package = 'statefulwidget')
}

#' @rdname statefulwidget-shiny
#' @export
renderStatefulwidget <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, statefulwidgetOutput, env, quoted = TRUE)
}
