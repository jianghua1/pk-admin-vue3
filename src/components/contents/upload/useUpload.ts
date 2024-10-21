import { ElMessage } from 'element-plus'
export function useUpload() {
  const uploadRef = ref()
  const [visibleUpload, toggleVisibleUpload] = useToggle(true)
  function beforeUpload(file) {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      ElMessage.error('只能上传图片')
      return false
    }
    toggleVisibleUpload(false)
    return true
  }
  const handleRemove = () => {
    if (uploadRef.value && uploadRef.value.clearFiles) {
      uploadRef.value.clearFiles()
      toggleVisibleUpload(true)
    }
  }
  return { uploadRef, visibleUpload, toggleVisibleUpload, beforeUpload, handleRemove }
}
