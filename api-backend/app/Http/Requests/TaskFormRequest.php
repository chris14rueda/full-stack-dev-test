<?php

namespace App\Http\Requests;

use Illuminate\Http\Exceptions\HttpResponseException;

class TaskFormRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
        ];
    }

}
