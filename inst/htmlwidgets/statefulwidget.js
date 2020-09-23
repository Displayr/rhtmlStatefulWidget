HTMLWidgets.widget({
  name: 'statefulwidget',
  type: 'output',

  factory: function(el, width, height, stateChanged) {
    return {
      _clickHandler: null,
      _hoverHandler: null,
      _crashOnResize: null,

      renderValue: function(x, state) {
        if (x.crash_on_render)
          throw new Error("Crashing on render");
        if (x.crash_on_rerender && !this._x)
          throw new Error("Crashing on rerender");
        this._crashOnResize = x.crash_on_resize;

        el.innerText = x.message;      // A very simple widget.
        if (state)
          el.style.fontWeight = state;   // Restore state.

        // Click switches the text between bold and normal.
        var _this = this;
        if (this._clickHandler)
          el.removeEventListener("click", this._clickHandler);
        this._clickHandler = function() { _this._textClick(x.crash_on_naive_click, x.crash_on_timeout); }
        el.addEventListener("click", this._clickHandler);

        if (x.crash_on_jquery_hover) {
          if (this._hoverHandler)
            jQuery(el).off( "mouseenter mouseleave" );
          this._hoverHandler = function() { _this._textHover(); }
          jQuery(el).on("mouseenter mouseleave", this._hoverHandler);
        }
      },

      _textClick: function(crash_on_click, crash_on_timeout) {
        if (crash_on_click)
          throw new Error("Crashing on click (DOM event handler)");

        // use click to trigger timeout, so it could be caught by chrome test
        if (crash_on_timeout)
          setTimeout(function() { throw new Error("Crashing on timeout"); }, 0);
          
        el.style.fontWeight = el.style.fontWeight === "bold" ? "normal" : "bold";
        if (stateChanged)  // Careful - old versions of htmlwidgets will not pass this.
          stateChanged(el.style.fontWeight);   // Will save our new state.
      },

      _textHover: function() {
        // Jquery will only be used when crash_on_jquery_hover is true. so 
        // this event will be attached only when we want a crash on hover.
        throw new Error("Crashing on hover(jquery event handler)");
      },

      resize: function(width, height) {   
        if (this._crashOnResize)
          throw new Error("Crashing on resize");
      }
    };
  }
});
