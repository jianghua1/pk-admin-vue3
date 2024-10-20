import { ElMessage } from 'element-plus'

export function useUpload() {
  const uploadRef = ref()

  function beforeUpload(file) {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      ElMessage.error('只能上传图片')
      return false
    }
    hide()
    return true
  }

  function handleRemove() {
    if (uploadRef.value && uploadRef.value.clearFiles) {
      uploadRef.value.clearFiles()
      // 显示上传区域
      show()
    }
  }

  // 隐藏trigger与tips
  function hide() {
    if (uploadRef.value) {
      // 获取dom
      const el = uploadRef.value.$el
      // 操作子dom .tips与.el-upload-dragger 进行隐藏
      const tips = el.querySelector('.tips')
      const dragger = el.querySelector('.el-upload-dragger')
      if (tips) {
        tips.style.display = 'none'
      }
      if (dragger) {
        dragger.style.display = 'none'
      }
    }
  }
  function show() {
    if (uploadRef.value) {
      // 获取dom
      const el = uploadRef.value.$el
      // 操作子dom .tips与.el-upload-dragger 进行隐藏
      const tips = el.querySelector('.tips')
      const dragger = el.querySelector('.el-upload-dragger')
      if (tips) {
        tips.style.display = 'block'
      }
      if (dragger) {
        dragger.style.display = 'block'
      }
    }
  }

  return {
    uploadRef,
    beforeUpload,
    handleRemove
  }
}
