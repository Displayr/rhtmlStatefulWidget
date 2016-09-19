HTMLWidgets.widget({
  name: 'statefulwidget',
  type: 'output',

  factory: function(el, width, height, stateChanged) {
    return {
      _clickHandler: null,

      renderValue: function(x, state) {
        el.innerText = x.message;      // A very simple widget.
        el.style.fontWeight = state;   // Restore state.

        // Click switches the text between bold and normal.
        var _this = this;
        if (this._clickHandler)
          el.removeEventListener("click", this._clickHandler);
        this._clickHandler = function() { _this._textClick(); }
        el.addEventListener("click", this._clickHandler);
      },

      _textClick: function() {
        el.style.fontWeight = el.style.fontWeight === "bold" ? "normal" : "bold";
        stateChanged(el.style.fontWeight);   // Notify widget owner that he should call getState() to save the latest state.
      },

      resize: function(width, height) {
      }
    };
  }
});