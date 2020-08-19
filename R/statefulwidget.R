#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
statefulwidget <- function(message, width = NULL, height = NULL, elementId = NULL, can_run_in_root_dom = FALSE) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  w <- htmlwidgets::createWidget(
    name = 'statefulwidget',
    x,
    width = width,
    height = height,
    package = 'statefulwidget',
    elementId = elementId
  )

  if (can_run_in_root_dom)  # default is FALSE for backwards compatibility of existing Chrome tests
    class(w) <- append(class(w), "can-run-in-root-dom")

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
