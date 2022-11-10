<?php

namespace Database\Seeders;

use App\Models\Label;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Label::create([
           'label' => 'izgalmas'
        ]);
        Label::create([
           'label' => 'romantikus'
        ]);
        Label::create([
           'label' => 'kasszasiker'
        ]);
        Label::create([
           'label' => 'filmadaptáció'
        ]);
        Label::create([
           'label' => 'féfiaknak'
        ]);
        Label::create([
            'label' => 'tini'
        ]);

    }
}
