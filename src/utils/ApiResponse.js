class ApiResponse {
   constructor(statusCode, data, message = "Success"){
       this.statusCode = statusCode
       this.data = data
       this.message = message
       this.success = statusCode < 400
   }
}

const res = new ApiResponse(499,{},"",)

export { ApiResponse }