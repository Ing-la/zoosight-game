/**
 * 对话式场景处理器
 * 处理传统的对话-选择交互模式
 */
export class DialogueHandler {
  constructor(eventData) {
    this.eventData = eventData;
    this.choices = [];
    this.currentInteractionIndex = 0;
    this.currentInteraction = null;
  }

  init() {
    this.choices = [];
    if (this.eventData.interactions && this.eventData.interactions.length > 0) {
      this.currentInteraction = this.eventData.interactions[0];
      this.currentInteractionIndex = 0;
    }
  }

  /**
   * 处理描述性节点的继续操作
   */
  handleContinue() {
    if (!this.currentInteraction) return;

    // 检查是否有下一个交互
    if (this.currentInteraction.next && this.currentInteraction.next !== null) {
      const nextInteraction = this.eventData.interactions.find(i => i.id === this.currentInteraction.next);
      if (nextInteraction) {
        this.currentInteraction = nextInteraction;
        this.currentInteractionIndex = this.eventData.interactions.indexOf(nextInteraction);
      } else {
        this.currentInteraction = null;
      }
    } else {
      this.currentInteraction = null;
    }
  }

  handleInteraction(interactionId, optionId) {
    if (!this.currentInteraction) return;

    const option = this.currentInteraction.options.find(opt => opt.id === optionId);
    if (!option) return;

    // 保存选择
    this.addChoice({
      interactionId: this.currentInteraction.id,
      optionId: option.id,
      optionText: option.text,
      traits: option.traits || {}
    });

    // 检查是否有下一个交互
    if (option.next && option.next !== null) {
      const nextInteraction = this.eventData.interactions.find(i => i.id === option.next);
      if (nextInteraction) {
        this.currentInteraction = nextInteraction;
        this.currentInteractionIndex = this.eventData.interactions.indexOf(nextInteraction);
      } else {
        this.currentInteraction = null;
      }
    } else {
      this.currentInteraction = null;
    }
  }

  getCurrentState() {
    if (!this.currentInteraction) {
      return {
        type: null,
        interaction: null,
        interactionIndex: this.currentInteractionIndex,
        totalInteractions: this.eventData.interactions?.length || 0
      };
    }

    // 根据 interaction 的 type 字段判断类型，默认为 'dialogue'
    const interactionType = this.currentInteraction.type || 'dialogue';
    
    return {
      type: interactionType,
      interaction: this.currentInteraction,
      interactionIndex: this.currentInteractionIndex,
      totalInteractions: this.eventData.interactions?.length || 0
    };
  }

  isComplete() {
    return this.currentInteraction === null;
  }

  addChoice(choice) {
    this.choices.push(choice);
  }

  getChoices() {
    return this.choices;
  }
}
