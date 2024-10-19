<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOperationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'operation_type_id' => 'required|exists:operation_type,operation_type_id',
            'investment_id'     => 'required|exists:investment,investment_id',
            'currency_type_id'  => 'required|exists:currency_type,currency_type_id',
            'operation_date'    => 'required|date',
            'quantity'          => 'required|integer|min:1',
            'unit_price'        => 'required|numeric|min:0',
        ];
    }

    /**
     * Custom error messages for validation failures.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'operation_type_id.required' => 'The operation type is mandatory.',
            'operation_type_id.exists'   => 'The selected operation type is invalid.',
            'investment_id.required'     => 'The investment is mandatory.',
            'investment_id.exists'       => 'The selected investment is invalid.',
            'currency_type_id.required'  => 'The currency type is mandatory.',
            'currency_type_id.in'        => 'The selected currency type is invalid.',
            'operation_date.required'    => 'The operation date is mandatory.',
            'operation_date.date'        => 'The operation date must be a valid date.',
            'quantity.required'          => 'The quantity is mandatory.',
            'quantity.integer'           => 'The quantity must be a valid integer.',
            'quantity.min'               => 'The quantity must be at least 1.',
            'unit_price.required'        => 'The unit price is mandatory.',
            'unit_price.numeric'         => 'The unit price must be a valid number.',
            'unit_price.min'             => 'The unit price must be at least 0.',
        ];
    }
}
