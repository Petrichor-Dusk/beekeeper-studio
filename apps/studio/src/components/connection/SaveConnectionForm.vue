<template>
  <div class="save-connection expand">
    <h3 class="dialog-c-title">保存连接</h3>
    <div class="form-group">
      <input
        class="form-control"
        ref="nameInput"
        @keydown.enter.prevent.stop="save"
        type="text"
        v-model="config.name"
        placeholder="连接名称"
        :disabled="disabled"
      />
    </div>

    <div class="form-group" v-if="folders && folders.length > 0">
      <label
        >文件夹
        <i v-if="!isUltimate && !isCloud" class="material-icons menu-icon"
          >stars</i
        ></label
      >
      <in-app-folder-picker
        v-model="config.connectionFolderId"
        :disabled="disabled || (!isUltimate && !isCloud)"
        folder-path="data/connectionFolders"
      />
    </div>

    <div class="row flex-middle">
      <label class="checkbox-group" for="rememberPassword">
        <input
          class="form-control"
          id="rememberPassword"
          type="checkbox"
          name="rememberPassword"
          v-model="config.rememberPassword"
          :disabled="disabled"
        />
        <span>保存密码</span>
        <i class="material-icons" v-tooltip="'密码保存时会进行加密'"
          >help_outlined</i
        >
      </label>
      <span class="expand" />
      <ColorPicker
        :value="config.labelColor"
        v-model="config.labelColor"
        :disabled="disabled"
      />
    </div>

    <div class="save-actions">
      <button
        v-if="canCancel"
        class="btn btn-flat"
        @click.prevent="$emit('cancel')"
        :disabled="disabled"
      >
        取消
      </button>
      <button
        class="btn btn-primary save"
        @click.prevent="save"
        :disabled="disabled"
      >
        保存
      </button>
    </div>
  </div>
</template>
<script>
import ColorPicker from "../common/form/ColorPicker.vue";
import InAppFolderPicker from "../common/form/InAppFolderPicker.vue";

export default {
  components: { ColorPicker, InAppFolderPicker },
  props: [
    "config",
    "canCancel",
    "selectInput",
    "folders",
    "isUltimate",
    "isCloud",
    "disabled",
  ],
  mounted() {
    if (this.selectInput) {
      const $input = this.$refs.nameInput;
      $input.focus();
      const len = $input.value.length;
      $input.setSelectionRange(len, len);
    }
  },
  methods: {
    save() {
      this.$emit("save", this.config);
    },
  },
};
</script>
