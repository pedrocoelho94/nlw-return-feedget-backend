import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

// spies = espiões
const createFeedbackSPy = jest.fn()
const sendMailSPy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSPy },
  { sendMail: sendMailSPy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'bug',
        comment: 'I have a problem',
        screenshot: 'data:image/png;base64,screenshot.png'
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSPy).toHaveBeenCalled()
    expect(sendMailSPy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'I have a problem',
        screenshot: 'data:image/png;base64,screenshot.png'
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'Bug',
        comment: '',
        screenshot: 'data:image/png;base64,screenshot.png'
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'Bug',
        comment: 'I have a problem',
        screenshot: 'screenshot.png'
      })
    ).rejects.toThrow()
  })
})
