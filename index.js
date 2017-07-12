import React, { Component, PropTypes } from 'react'
import { Animated, View, Image, StyleSheet } from 'react-native'

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailOpacity: new Animated.Value(0),
    }
    this.animatedImageComponent = Animated.createAnimatedComponemt(this.props.imageComponent)
  }

  onLoadThumbnail() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: this.props.thumbnailFadeDuration,
    }).start()
    this.props.onLoadThumbnail()
  }

  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: this.props.imageFadeDuration,
    }).start()
    this.props.onLoadImage()
  }

  render() {
    return (
      <View style={this.props.style}>
        <this.props.imageComponent
          resizeMode="cover"
          style={[styles.image, this.props.style]}
          source={this.props.placeHolderSource}
        />
        <this.animatedImageComponent
          resizeMode="cover"
          style={[styles.image, { opacity: this.state.thumbnailOpacity }, this.props.style]}
          source={this.props.thumbnailSource}
          onLoad={() => this.onLoadThumbnail()}
          blurRadius={this.props.thumbnailBlurRadius}
          children={this.props.children}
          {...this.props.imageProps}
        />
        <this.animatedImageComponent
          resizeMode="cover"
          style={[styles.image, { opacity: this.state.imageOpacity }, this.props.style]}
          source={this.props.imageSource}
          onLoad={() => this.onLoadImage()}
          children={this.props.children}
          {...this.props.imageProps}
        />
      </View>
    )
  }
}

 const styles = StyleSheet.create({
   image: {
     position: 'absolute',
     top: 0,
     bottom: 0,
     left: 0,
     right: 0,
   },
 })

ProgressiveImage.propTypes = {
  placeHolderColor: PropTypes.string,
  placeHolderSource: PropTypes.number,
  imageSource: PropTypes.object.isRequired,
  imageFadeDuration: PropTypes.number.isRequired,
  onLoadThumbnail: PropTypes.func.isRequired,
  onLoadImage: PropTypes.func.isRequired,
  thumbnailSource: PropTypes.object.isRequired,
  thumbnailFadeDuration: PropTypes.number.isRequired,
  thumbnailBlurRadius: PropTypes.number,
}

ProgressiveImage.defaultProps = {
  thumbnailFadeDuration: 250,
  imageFadeDuration: 250,
  thumbnailBlurRadius: 5,
  onLoadThumbnail: Function.prototype,
  onLoadImage: Function.prototype,
  imageComponent: Image,
}
