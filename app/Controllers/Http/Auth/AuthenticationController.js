'use strict'

const User = use('App/Models/User');
const { validate } = use('Validator')
const Mail = use('Mail')
const randomString = require('random-string')

class AuthenticationController {
  // Registr Paage
  registerPage ({ view }) {
    return view.render('auth.register')
  }
  // Registr Action
  async store ({ request, response, session }) {
    // Validate Form Input
    const data = request.all()
    const rules = {
      firstName: 'required|min:3|max:30',
      lastName: 'required|min:3|max:30',
      email: 'required|email|unique:users,email',
      password: 'required|min:6',
      confimrPassword: 'required_if:password|confirmed'
    }
    const messages = {
      'firstName.required': 'هذا الحقل مطلوب الرجاء ملؤه...',
      'firstName.min': 'الرجاء أدخل أكثر من محرفين في هذا الحقل!',
      'firstName.max': 'عدد المحارف الأعلى المسموح به :ثلاثون محرفا',

      'lastName.required': 'هذا الحقل مطلوب الرجاء ملؤه...',
      'lastName.min': 'الرجاء أدخل أكثر من محرفين في هذا الحقل!',
      'lastName.max': 'عدد المحارف الأعلى المسموح به :ثلاثون محرفا',

      'email.required': 'هذا الحقل مطلوب الرجاء ملؤه...',
      'email.email': 'الرجاء إدخال بريد إلكتروني صالح',
      'email.unique': 'هذا البديد الإلكتروني مسجل لدينا بالفعل',

      'password.required': 'هذا الحقل مطلوب الرجاء ملؤه...',
      'password.min': 'كلمة المرور يجب أن تكون أكثر من ستة محارف!',

      'confimrPassword.confirmed': 'لا يوجد تطابق مع كلمة المرور المدخلة ! ',
      'confimrPassword.required_if': 'هذا الحقل مطلوب الرجاء ملؤه..'
    }
    const validation = await validate(data, rules)
    if(validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])
        console.log('Fail')
        return response.redirect('back')
    }
    confimrPassword.delete()
    const user = await User.create({
      first_name: request.input('firstName'),
      last_name: request.input('lastName'),
      email: request.input('email'),
      password: request.input('password'),
      sex: request.input('sex'),
      confirmation_token: randomString({ length: 40 }),
    })
    console.log(user)
    // Send Email Confirmation
    await Mail.send('auth.emails.confirm_account', user.toJSON(), message => {
      message
      .from('Qappassat.com')
      .to(user.email)
      .subject('Plase Confirm Your Email Address')
    })
    // Display Success Message
    session.flash({
      notification: {
        type: 'success',
        message: 'تمت عملية تسجيل الحساب بنجاح ! قمنا بإرسال رسالة إلى بريدكم الأكتروني ! الرجاء مراجعة صندوق الوادد ومصادقة حسابكم'
      }
    })

    return response.redirect('back')
  }
}

module.exports = AuthenticationController
