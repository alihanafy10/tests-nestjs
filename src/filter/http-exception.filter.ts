import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // التحقق مما إذا كان الاستثناء هو HttpException
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;  // حالة الخطأ الافتراضية 500

    // يمكنك تخصيص الرسالة بناءً على نوع الخطأ
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Unexpected error occurred.';
    
      // الحصول على stack trace لمعرفة السطر الذي حدث فيه الخطأ
    const stack = exception instanceof Error ? exception.stack : null;

    // استخراج السطر الذي حدث فيه الخطأ من stack trace
    const lineNumber = stack ? stack.split('\n')[1].trim() : 'Unknown';

    // إرسال الرد مع كود الخطأ والرسالة المخصصة
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      errorLocation: lineNumber,  // موقع الخطأ (السطر)
      stack: stack  // stack trace لإعطاء معلومات إضافية
    });
  }
}