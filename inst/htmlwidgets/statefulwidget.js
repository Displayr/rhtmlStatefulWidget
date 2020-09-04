HTMLWidgets.widget({
  name: 'statefulwidget',
  type: 'output',

  factory: function(el, width, height, stateChanged) {
    return {
      _clickHandler: null,
      _count_until_resize_crash: null,

      renderValue: function(x, state) {
        if (x.crash_on_render)
          throw new Error("Crashing on render");
        if (x.crash_on_rerender && !this._x)
          throw new Error("Crashing on rerender");
        if (x.crash_on_resize)
          this._count_until_resize_crash = 1;  // ignore first resize, which always follows render
        if (x.crash_on_timeout)
          setTimeout(function() { throw new Error("Crashing on timeout"); }, 1000);

        el.innerText = x.message;      // A very simple widget.
        if (state)
          el.style.fontWeight = state;   // Restore state.

        // Click switches the text between bold and normal.
        var _this = this;
        if (this._clickHandler) {
          el.removeEventListener("click", this._clickHandler);
          jQuery(el).off("click");
        }
        this._clickHandler = function() { _this._textClick(x.crash_on_naive_click || x.crash_on_jquery_click); }
        el.addEventListener("click", this._clickHandler);
        jQuery(el).on("click", this._clickHandler);
      },

      _textClick: function(crash_on_click) {
        if (crash_on_click)
          throw new Error("Crashing on click");
        el.style.fontWeight = el.style.fontWeight === "bold" ? "normal" : "bold";
        if (stateChanged)  // Careful - old versions of htmlwidgets will not pass this.
          stateChanged(el.style.fontWeight);   // Will save our new state.
      },

      resize: function(width, height) {   
        if (this._count_until_resize_crash !== null && this._count_until_resize_crash-- === 0)
          throw new Error("Crashing on resize");
      }
    };
  }
});