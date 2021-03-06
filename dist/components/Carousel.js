'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@material-ui/core');

var _styles = require('@material-ui/core/styles');

var _autoBind = require('auto-bind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _FiberManualRecord = require('@material-ui/icons/FiberManualRecord');

var _FiberManualRecord2 = _interopRequireDefault(_FiberManualRecord);

var _NavigateBefore = require('@material-ui/icons/NavigateBefore');

var _NavigateBefore2 = _interopRequireDefault(_NavigateBefore);

var _NavigateNext = require('@material-ui/icons/NavigateNext');

var _NavigateNext2 = _interopRequireDefault(_NavigateNext);

var _reactSwipeable = require('react-swipeable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
    root: {
        position: "relative"
    },
    indicators: {
        width: "100%",
        marginTop: "10px",
        textAlign: "center"
    },
    indicator: {
        fontSize: "15px",
        cursor: "pointer",
        transition: "200ms",
        color: "#afafaf",
        '&:hover': {
            color: "#1f1f1f"
        },
        '&:active': {
            color: "#1f1f1f"
        }
    },
    active: {
        color: "#494949"
    },
    buttonWrapper: {
        position: "absolute",
        height: "100px",
        backgroundColor: "transparent",
        top: "calc(50% - 70px)",
        '&:hover': {
            '& $button': {
                backgroundColor: "black",
                filter: "brightness(120%)",
                opacity: 0.4
            }
        }
    },
    fullHeightHoverWrapper: {
        height: "calc(100% - 20px - 10px) !important",
        top: "0 !important"
    },
    button: {
        margin: "0 10px",
        position: "relative",
        backgroundColor: "#494949",
        top: "30px",
        color: "white",
        fontSize: "30px",
        transition: "200ms",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.6 !important"
        }
    },
    fullHeightHoverButton: {
        top: "calc(50% - 20px) !important"
    },
    buttonVisible: {
        opacity: "0.6"
    },
    buttonHidden: {
        opacity: "0"
    },
    next: {
        right: 0
    },
    prev: {
        left: 0
    }
};

var Carousel = function (_Component) {
    _inherits(Carousel, _Component);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        var strictIndexing = _this.props.strictIndexing !== undefined ? props.strictIndexing : true;
        var startAt = _this.props.startAt !== undefined ? props.startAt : 0;
        // if startAt is bigger than the children length, set it to be the last child (if strictIndexing)
        startAt = Array.isArray(_this.props.children) ? strictIndexing && startAt > _this.props.children.length - 1 ? _this.props.children.length - 1 : startAt : 0;

        _this.state = {
            active: startAt,
            autoPlay: _this.props.autoPlay !== undefined ? _this.props.autoPlay : true,
            interval: _this.props.interval !== undefined ? _this.props.interval : 4000,
            displayed: startAt
        };

        _this.timer = null;

        (0, _autoBind2.default)(_this);
        return _this;
    }

    _createClass(Carousel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.start();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stop();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevProps.autoPlay !== prevState.autoPlay || prevProps.interval !== prevState.interval) {
                this.reset();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    }, {
        key: 'start',
        value: function start() {
            if (this.state.autoPlay) {
                this.timer = setInterval(this.next, this.state.interval);
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.stop();

            if (this.state.autoPlay) {
                this.start();
            }
        }
    }, {
        key: 'pressIndicator',
        value: function pressIndicator(index) {
            var _this2 = this;

            var animation = this.props.animation !== undefined ? this.props.animation : "fade";
            var timeout = this.props.timeout !== undefined ? this.props.timeout : animation === "fade" ? 500 : 200;

            this.setState({
                active: index,
                displayed: this.state.active
            }, this.reset);

            setTimeout(function () {
                _this2.setState({
                    displayed: index
                });
            }, timeout);
        }
    }, {
        key: 'next',
        value: function next(event) {
            var _this3 = this;

            var active = this.state.active;
            var next = this.state.active + 1 > this.props.children.length - 1 ? 0 : this.state.active + 1;
            var animation = this.props.animation !== undefined ? this.props.animation : "fade";
            var timeout = this.props.timeout !== undefined ? this.props.timeout : animation === "fade" ? 500 : 200;
            var userNext = this.props.next !== undefined ? this.props.next : function () {};

            this.setState({
                active: next,
                displayed: this.state.active
            }, this.reset);

            setTimeout(function () {
                _this3.setState({
                    displayed: next
                }, function () {
                    return userNext(next, active);
                });
            }, timeout);

            if (event) event.stopPropagation();
        }
    }, {
        key: 'prev',
        value: function prev(event) {
            var _this4 = this;

            var active = this.state.active;
            var prev = this.state.active - 1 < 0 ? this.props.children.length - 1 : this.state.active - 1;
            var animation = this.props.animation !== undefined ? this.props.animation : "fade";
            var timeout = this.props.timeout !== undefined ? this.props.timeout : animation === "fade" ? 500 : 200;
            var userPrev = this.props.prev !== undefined ? this.props.prev : function () {};

            this.setState({
                active: prev,
                displayed: this.state.active
            }, this.reset);

            setTimeout(function () {
                _this4.setState({
                    displayed: prev
                }, userPrev(prev, active));
            }, timeout);

            if (event) event.stopPropagation();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var indicators = this.props.indicators !== undefined ? this.props.indicators : true;
            var navButtonsAlwaysVisible = this.props.navButtonsAlwaysVisible !== undefined ? this.props.navButtonsAlwaysVisible : false;
            var animation = this.props.animation !== undefined ? this.props.animation : "fade";
            var timeout = this.props.timeout !== undefined ? this.props.timeout : animation === "fade" ? 500 : 200;
            var fullHeightHover = this.props.fullHeightHover !== undefined ? this.props.fullHeightHover : true;

            var classes = this.props.classes;
            var buttonCssClassValue = classes.button + ' ' + (navButtonsAlwaysVisible ? classes.buttonVisible : classes.buttonHidden) + ' ' + (fullHeightHover ? classes.fullHeightHoverButton : "");
            var buttonWrapperCssClassValue = classes.buttonWrapper + ' ' + (fullHeightHover ? classes.fullHeightHoverWrapper : "");

            return _react2.default.createElement(
                'div',
                { className: classes.root + ' ' + (this.props.className ? this.props.className : ""), onMouseEnter: this.stop, onMouseOut: this.reset },
                Array.isArray(this.props.children) ? this.props.children.map(function (child, index) {
                    return _react2.default.createElement(CarouselItem, {
                        key: 'carousel-item' + index,
                        display: index === _this5.state.displayed ? true : false,
                        active: index === _this5.state.active ? true : false,
                        child: child,
                        animation: animation,
                        timeout: timeout,
                        next: _this5.next,
                        prev: _this5.prev
                    });
                }) : _react2.default.createElement(CarouselItem, {
                    key: 'carousel-item0',
                    display: true,
                    active: true,
                    child: this.props.children,
                    animation: animation,
                    timeout: timeout
                    // next={this.next}
                    // prev={this.prev}
                }),
                _react2.default.createElement(
                    'div',
                    { className: buttonWrapperCssClassValue + ' ' + classes.next },
                    _react2.default.createElement(
                        _core.IconButton,
                        { className: buttonCssClassValue + ' ' + classes.next, onClick: this.next, 'aria-label': 'Next' },
                        _react2.default.createElement(_NavigateNext2.default, null)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: buttonWrapperCssClassValue + ' ' + classes.prev },
                    _react2.default.createElement(
                        _core.IconButton,
                        { className: buttonCssClassValue + '  ' + classes.prev, onClick: this.prev, 'aria-label': 'Previous' },
                        _react2.default.createElement(_NavigateBefore2.default, null)
                    )
                ),
                indicators ? _react2.default.createElement(Indicators, { classes: classes, length: this.props.children.length, active: this.state.active, press: this.pressIndicator }) : null
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps.autoPlay !== prevState.autoPlay || nextProps.interval !== prevState.interval) {
                return {
                    autoPlay: nextProps.autoPlay !== undefined ? nextProps.autoPlay : true,
                    interval: nextProps.interval !== undefined ? nextProps.interval : 4000
                };
            } else return null;
        }
    }]);

    return Carousel;
}(_react.Component);

function CarouselItem(props) {
    var swipeHandlers = (0, _reactSwipeable.useSwipeable)({
        onSwipedLeft: function onSwipedLeft() {
            return props.next();
        },
        onSwipedRight: function onSwipedRight() {
            return props.prev();
        }
    });

    return props.display ? _react2.default.createElement(
        'div',
        _extends({}, swipeHandlers, { className: 'CarouselItem' }),
        props.animation === "slide" ? _react2.default.createElement(
            _core.Slide,
            { direction: 'left', 'in': props.active, timeout: props.timeout },
            _react2.default.createElement(
                'div',
                null,
                props.child
            )
        ) : _react2.default.createElement(
            _core.Fade,
            { 'in': props.active, timeout: props.timeout },
            _react2.default.createElement(
                'div',
                null,
                props.child
            )
        )
    ) : null;
}

function Indicators(props) {
    var classes = props.classes;

    var indicators = [];

    var _loop = function _loop(i) {
        var className = i === props.active ? classes.indicator + ' ' + classes.active : '' + classes.indicator;
        var item = _react2.default.createElement(_FiberManualRecord2.default, { key: i, size: 'small', className: className, onClick: function onClick() {
                props.press(i);
            } });

        indicators.push(item);
    };

    for (var i = 0; i < props.length; i++) {
        _loop(i);
    }

    return _react2.default.createElement(
        'div',
        { className: '' + classes.indicators },
        indicators
    );
}

exports.default = (0, _styles.withStyles)(styles)(Carousel);