HTMLWidgets.widget({
  name: 'statefulwidget',
  type: 'output',

  factory: function(el, width, height, stateChanged) {
    return {
      _clickHandler: null,
      _x: null,

      renderValue: function(x, state) {
        if (x.crash_on_render)
          throw new Error("Crashing on render");
        if (x.crash_on_rerender && !this._x)
          throw new Error("Crashing on rerender");

        this._x = x;
        el.innerText = x.message;      // A very simple widget.
        if (state)
          el.style.fontWeight = state;   // Restore state.

        // Click switches the text between bold and normal.
        var _this = this;
        if (this._clickHandler)
          el.removeEventListener("click", this._clickHandler);
        this._clickHandler = function() { _this._textClick(); }
        el.addEventListener("click", this._clickHandler);
      },

      _textClick: function() {
        if (this._x.crash_on_click)
          throw new Error("Crashing on click");
        el.style.fontWeight = el.style.fontWeight === "bold" ? "normal" : "bold";
        if (stateChanged)  // Careful - old versions of htmlwidgets will not pass this.
          stateChanged(el.style.fontWeight);   // Will save our new state.
      },

      resize: function(width, height) {   
        if (x.crash_on_resize)
          throw new Error("Crashing on resize");
      }
    };
  }
});